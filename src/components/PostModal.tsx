import '../styles/postModal.css'
import { Box, Typography, Chip, Divider } from '@mui/material'
import { Post } from '../models/dataTypes'
import ModalHeader from './modalHeader'
import OpenStreetMap from './OpenStreetMap'
import MapPin from './MapPin'
import { ThumbDown, ThumbUp } from '@mui/icons-material'

type Props = {
  post: Post
  saved: boolean
}

const style1 = {
  position: 'absolute',
  right: '-5%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2.5,
  overflowY: 'hidden',
  maxHeight: '86%',
  maxWidth: '60%',
  minWidth: '460px',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column'
}

export default function PostModal(props: Props) {
  const { post, saved } = props
  console.log(post)
  return (
    <Box sx={style1}>
      <ModalHeader saved={saved} uid={post.poster_uid} />
      <Typography id="modal-modal-title" variant="h4" sx={{ fontWeight: 'bold', mb: 0.5, textDecoration: 'underline' }}>
        {post.title}
      </Typography>
      <Typography sx={{ mb: 2 }}>3.2km away from you</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '45%' }}>
          <Typography id="modal-modal-description" variant="body1" sx={{ mb: 1 }}>
            {post.description}
          </Typography>
          <Box sx={{ height: '48vh', width: '48vh', borderRadius: '12px', overflow: 'hidden' }}>
            <img className="image2" src={post.image} loading="lazy" alt="post_img" />
          </Box>
        </Box>

        <Divider variant="middle" orientation="vertical" flexItem sx={{ m: 5 }} style={{ backgroundColor: 'black' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '40%' }}>
          <Typography sx={{ mb: 1 }}>
            <b>Valid until:</b> 21.06.2023
          </Typography>
          <Typography>
            <b>Address:</b>
          </Typography>
          <Typography sx={{ mr: 1 }}>{post.location.name}</Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              height: '40vh',
              width: '40vh',
              borderRadius: '12px',
              overflow: 'hidden',
              justifyContent: 'center'
            }}>
            <OpenStreetMap
              center={{ lat: post.location.lat, lng: post.location.lng }}
              style={{ height: '45vh', width: '45vh' }}>
              <MapPin
                lat={post.location.lat}
                lng={post.location.lng}
                canMove={false}
                onPosChange={function (lat: number, lng: number): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </OpenStreetMap>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
        <ThumbUp></ThumbUp>
        <ThumbDown sx={{ ml: 2 }}></ThumbDown>
      </Box>
    </Box>
  )
}
