import { useUser } from '../lib/hooks'
import { useState } from 'react'
import Layout from '../components/layout'
import { getMediaList } from '../lib/mediaList'
import MediaList from '../components/MediaList'
import FocusedMedia from '../components/FocusedMedia'
import Upload from '../components/Upload'

export async function getServerSideProps(context) {
  const media = await getMediaList();
  return {
    props: {media},
  }
}

const Home = (props) => {
  const user = useUser({ redirectTo: '/login' });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  return (
    <Layout>
      <MediaList media={props.media} setFocusedIndex={setFocusedIndex} />

      {focusedIndex > -1 && 
        <FocusedMedia mediaList={props.media} focusedIndex={focusedIndex} setFocusedIndex={setFocusedIndex} /> 
      }

      <Upload />
      <style jsx>{`
      `}</style>
    </Layout>
  )
}


export default Home
