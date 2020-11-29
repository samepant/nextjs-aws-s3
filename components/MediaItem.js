const imgBlockMeasure = 23.5;

const MediaItem = (props) => (
  <figure>
    <img src={props.url} loading="lazy" />

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
)

export default MediaItem
