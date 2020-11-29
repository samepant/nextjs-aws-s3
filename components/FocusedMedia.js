
const FocusedMedia = (props) => {
  const goToNextImage = () => {
    const nextIndex = props.focusedIndex + 1 === props.mediaList.length ? 0 : props.focusedIndex + 1;
    props.setFocusedIndex(nextIndex);
  }

  const goToPreviosImage = () => {
    const nextIndex = props.focusedIndex === 0 ? props.mediaList.length - 1 : props.focusedIndex - 1;
    props.setFocusedIndex(nextIndex);
  }
  const formatURL = (key) => {
    const request = JSON.stringify({
      bucket: process.env.BUCKET_NAME,
      key: key,
      edits: {
        resize: {
          width: 1500,
        }   
      }
    });

    const base64Encoded = Buffer.from(request).toString('base64');

    return `https://d1p46fbo5du4bt.cloudfront.net/${base64Encoded}`
  }

  const downloadImage = () => {
    const imageURL = `https://xo-tours-pix.s3.us-east-2.amazonaws.com/${props.mediaList[props.focusedIndex].key}`;
    if (navigator.share) {
      navigator.share({
        url: imageURL
      })
      .catch(console.error);
    } else {
      window.open(imageURL, '_blank');
    }
  }
  return (
    <div className='focused'>
      <figure>
        <img src={formatURL(props.mediaList[props.focusedIndex].key)} alt="" />
      </figure>
      <div className='toolbar'>
         <button onClick={downloadImage}>Download</button>
         <button onClick={() => props.setFocusedIndex(-1)}>Close</button>
         <button onClick={goToPreviosImage}>Previous</button>
         <button onClick={goToNextImage}>Next</button>
      </div>
      <style jsx >{`
        .focused {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          padding: 1em;
          background: cornsilk;
          z-index: 100;
        }

        figure img {
          width: 92vw;
          height: 92vh;
          object-fit: contain;
        }
        figure {
          margin: 0;
        }
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
        a {
          display: block;
          text-decoration: none;
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

        .toolbar {
          position: fixed;
          bottom: 1em;
          left: 0;
          width: 100vw;
          display: flex;
          justify-content: space-around;
          font-size: calc(10px + 0.3vmin);
        }
        
      `}</style>

    </div>
)}

export default FocusedMedia
