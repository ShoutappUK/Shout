import '../styles/feed.css'
import { Box, Tooltip } from '@mui/material'
import { useState } from 'react'
import PostFooter from './postFooter'
import { Post } from '../models/dataTypes'
import BookmarkButton from './bookmarkButton'

type Props = {
  post: Post
}

export default function PostTile(props: Props) {
  const { post } = props
  const [saved, setSaved] = useState(false)
  const handleSave = () => {
    console.log('handleSave')
  }

  return (
    <Box
      sx={{
        display: 'grid',
        overflow: 'hidden',
        borderRadius: '16px',
        height: '100%'
      }}>
      <Box>
        <img className={`card_image_${post.size}`} src={post.image} />
      </Box>

      <Box sx={{ position: 'absolute', justifySelf: 'right', p: 1 }}>
        <BookmarkButton saved_post={saved} size="small" />
      </Box>

      <PostFooter post={post} saved={saved} />
    </Box>
  )
}
