import axios from 'axios';
import { useState, useRef } from 'react'
import { FileDrop } from 'react-file-drop'
import { v4 as uuidv4 } from 'uuid';

export default function Upload(file) {
  const uploadPhoto = async (file) => {
    try {
      // set file to uploading
      const fileIndex = filesToUpload.findIndex(item => item.uuid === file.uuid);
      const newArray = [...filesToUpload];
      newArray[fileIndex].uploading = true;
      setFileData(newArray);
      const extension = file.name.split('.').pop();
      const filename = encodeURIComponent(`${nameText}/${file.uuid}.${extension}`);
      const res = await axios.get(`/api/upload-url?file=${filename}`);
      const { url, fields } = res.data;
      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const upload = await axios.post(url, formData);

      if (upload.status === 204) {
        const fileIndex = filesToUpload.findIndex(item => item.uuid === file.uuid);
        const newArray = [...filesToUpload];
        newArray[fileIndex].uploading = false;
        newArray[fileIndex].complete = true;
        setFileData(newArray);
        return null;
      } else {
        const fileIndex = filesToUpload.findIndex(item => item.uuid === file.uuid);
        const newArray = [...filesToUpload];
        newArray[fileIndex].uploading = false;
        newArray[fileIndex].error = true;
        setFileData(newArray);
        return {uuid: file.uuid, error: true};
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fileInputRef = useRef(null);
  const [showUpload, setShowUpload] = useState(false);
  const [filesToUpload, setFileData] = useState([]);
  const [nameText, setNameText] = useState('');

  const handleFiles = (files, e) => {
    const newFiles = Array.from(files);
    newFiles.forEach(file => {
      file.uuid = uuidv4();
      file.uploading = false;
      file.complete = false;
    })
    setFileData([...filesToUpload, ...newFiles]);
  }

  const onFileInputChange = (event) => {
    const { files } = event.target;
    handleFiles(files, event);
  }

  const handleUpload = async () => {
    // set up promises
    const filePromises = [];
    filesToUpload.forEach(file => filePromises.push(uploadPhoto(file)));

    const results = await Promise.all(filePromises);
    const errorResults = results.filter((result) => result !== null);

    if (errorResults.length === 0) {
      console.log('no errors');
      window.location.reload()
    }
    console.log(errorResults);
  }

  return (
    <div>
      <button className='open' onClick={() => setShowUpload(true)}>Upload Pics</button>

      {showUpload &&
        <div className='upload-form'>
          <form>
            <h2>Pictures to Upload</h2>
            <FileDrop 
              onTargetClick={() => fileInputRef.current.click()}
              onDrop={handleFiles}
            >
            {filesToUpload.length > 0 ? 
                <ul className='file-list'>
                  {filesToUpload.map(file => (
                    <li key={file.uuid} className={(file.complete && 'complete ') + (file.uploading && ' uploading')}>
                      <div className='filename'>{file.name}</div>
                     {file.uploading && 
                       <div className='uploading-icon'/>
                     }
                     {file.complete &&
                       <div className='complete-icon'>✓</div>
                     }
                    </li>
                  ))}
                </ul>
          :
            <p>Click or Drop Files Here</p>
          }
            </FileDrop>
            <input
              className='hidden'
              onChange={onFileInputChange}
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png, image/jpeg"
            />
            <label className='name-form'>Your Name (or who took the photos)
            <input className='name-input' type='text' placeholder='Type name here' onChange={(e) => setNameText(e.target.value)} /></label>
          </form>
          {filesToUpload.length > 0 && nameText.length > 2 && <button className='upload' onClick={handleUpload}>Upload</button>}
          <button className='close' onClick={() => setShowUpload(false)}>Close</button>
        </div>
      }
      <style jsx >{`
      button {
        outline: none;
        border: 1px solid green;
        font-size: 1.5em;
        background: white;
        color: green;
        padding: 0.5em 1em;
        border-radius: 1em;
        cursor: pointer;
        box-shadow: 0px 9px 80px rgba(51, 0, 75, 0.07), 0px 4.65569px 25.3798px rgba(51, 0, 75, 0.0687841), 0px 3.24309px 12.1842px rgba(51, 0, 75, 0.065015), 0px 2.07084px 5.18613px rgba(51, 0, 75, 0.05513);
      }
      h2 {
        font-weight: 400;
        text-align: center;
      }
      button.open {
        position: fixed;
        bottom: 1em;
        right: 1em;
        background: aliceblue;
      }
      button.close {
        font-size: 1em;
        display: block;
        margin: 0 auto 3em;
      }
      button.upload {
        display: block;
        margin: 1em auto 2em;
      }
      .filename {
        max-width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .upload-form {
        position: absolute;
        top:0;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        background: white;
      }

      form {
        max-width: 800px;
        padding: 2em;
        margin: 0 auto;
      }
      input.hidden {
        display: none;
      }
      .name-form {
        display: block;
        margin: 4em auto 0;
        text-align: center;
        font-size: 1.5em;
      }
      .name-input {
        display: block;
        border: 2px solid green;
        border-radius: 1em;
        padding: 0.5em 1em;
        background: white;
        margin: 1em auto;
        font-size: 1em;
        box-shadow: 0px 9px 80px rgba(51, 0, 75, 0.07), 0px 4.65569px 25.3798px rgba(51, 0, 75, 0.0687841), 0px 3.24309px 12.1842px rgba(51, 0, 75, 0.065015), 0px 2.07084px 5.18613px rgba(51, 0, 75, 0.05513);
      }
      .file-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
      }
      .file-list li {
        padding: 0.5em 1em;
        border: 1px solid green;
        border-radius: 1em;
        margin-bottom: 1em;
        width: 32%;  
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .uploading {
        background: cornsilk;
      }
      .complete {
        background: lightgreen;
      }
      .uploading-icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border: 1px solid green;
        animation: 3s linear infinite rotate;
      }
      .complete-icon {
        color: green;
        font-size: 1em;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg)
        }
        to {
          transform: rotate(360deg)
        }
      }

    `}</style>
      <style jsx global>{`
        /* drop zone css */

      .file-drop {
        /* relatively position the container bc the contents are absolute */
        position: relative;
        min-height: 200px;
        width: 100%;
        border: 2px solid green;
        border-radius: 1em;
        cursor: pointer;
        background: white;
        box-shadow: 0px 9px 80px rgba(51, 0, 75, 0.07), 0px 4.65569px 25.3798px rgba(51, 0, 75, 0.0687841), 0px 3.24309px 12.1842px rgba(51, 0, 75, 0.065015), 0px 2.07084px 5.18613px rgba(51, 0, 75, 0.05513);
      }

      .file-drop > .file-drop-target {
        min-height: 200px;
        width: 100%;
        border-radius: 1em;
        padding: 1em;
        display: flex;
        align-items: center; 
        justify-content: center;
        text-align: center;
      }

      .file-drop > .file-drop-target.file-drop-dragging-over-frame {
        /* overlay a black mask when dragging over the frame */
        border: none;
        background-color: aliceblue;
        box-shadow: none;
        z-index: 50;
        opacity: 1;

        /* typography */
        color: white;
      }

      .file-drop > .file-drop-target.file-drop-dragging-over-target {
        /* turn stuff orange when we are dragging over the target */
        color: #ff6e40;
        box-shadow: 0 0 13px 3px #ff6e40;
      }

    `}</style>
    </div>
  );
}