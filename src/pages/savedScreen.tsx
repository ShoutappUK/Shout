import { Box } from '@mui/material'
import { Post } from '../models/dataTypes'
import PostTile from '../components/PostTile'
import '../styles/feed.css'

export default function Saved() {
  // const renderPosts = () => {
  //   return context?.savedPosts.map((post: Post, index) => (
  //     <div className={`card card_${post.size}`} key={index}>
  //       <PostTile post={post}></PostTile>
  //     </div>
  //   ))
  // }
  return (
    <Box>
      <Box className="post_container"></Box>
    </Box>
  )
}
