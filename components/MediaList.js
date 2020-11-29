import MediaItem from './MediaItem'

const MediaList = (props) => (
  <ul>
    {props.media.map((item, index) => (
      <li key={item.etag} onClick={() => props.setFocusedIndex(index)}>
        <MediaItem keyName={item.key} index={index} />
      </li>
    ))}

    <style jsx >{`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
      }
      li {
        cursor: pointer;
        border: 2px solid white;
      }
      li:hover {
        border: 2px solid coral;
      }
    `}</style>

  </ul>
)

export default MediaList
