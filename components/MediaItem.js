const imgBlockMeasure = 23.5;

const MediaItem = (props) => {
  const formatURL = (key) => {
    const request = JSON.stringify({
      bucket: process.env.BUCKET_NAME,
      key: key,
      edits: {
        resize: {
          width: 600,
          height: 600
        }   
      }
    });

    const base64Encoded = Buffer.from(request).toString('base64');

    return `https://d1p46fbo5du4bt.cloudfront.net/${base64Encoded}`
  }

  return (
    <figure>
      <img src={formatURL(props.keyName)} loading="lazy" />

      <style jsx >{`
        figure {
          margin: 0;
        }
        figure img {
          width: ${imgBlockMeasure}vw;
          height: ${imgBlockMeasure}vw;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </figure>
)}

export default MediaItem
