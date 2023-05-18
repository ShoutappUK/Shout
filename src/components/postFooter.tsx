import { Box, Button, Modal, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PostModal from './PostModal'
import { useState } from 'react'
import { Post } from '../models/dataTypes'

type Props = {
  post: Post
  saved: boolean
}

export default function PostFooter(props: Props) {
  const { post, saved } = props
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const footerContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    opacity: '85%',
    width: '100%',
    bottom: 0
  } as const

  const titleContainer = {
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: '16px',
    px: 1,
    mx: 1,
    mb: 1,
    alignContent: 'center',
    width: '80%'
  } as const

  const moreContainer = {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '28px',
    height: '28px',
    justifyContent: 'center',
    alignSelf: 'center',
    display: 'flex',
    mr: 1,
    mb: 1
  } as const

  return (
    <Box sx={footerContainer}>
      <Box sx={titleContainer}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {post.title}
        </Typography>
      </Box>
      <Box sx={moreContainer}>
        <Button onClick={handleOpen} sx={{ maxWidth: '28px', maxHeight: '28px', minWidth: '28px', minHeight: '28px' }}>
          <MoreHorizIcon />
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <PostModal post={post} saved={saved} />
      </Modal>
    </Box>
  )
}
