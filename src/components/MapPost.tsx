import React from 'react'
import { Box, Typography } from '@mui/material'
import { StyledPaper, MapPostImage, MapPostText, PromotedText } from '../styles/mapPosts'
import { TitleRounded } from '@mui/icons-material'

const PLACEHOLDER_IMAGE =
  'https://st.hzcdn.com/fimgs/pictures/landscapes/ams-landscape-design-studios-inc-ams-landscape-design-studios-inc-img~94b1e3b60e948b2a_1473-1-3727add-w144-h144-b0-p0.jpg'

interface MapPostProps {
  image?: string
  title: string
  promoted?: boolean
}

export default function MapPost({ image = PLACEHOLDER_IMAGE, title, promoted = false }: MapPostProps) {
  return (
    <Box
      sx={{
        alignContent: 'center',
        position: 'relative',
        borderTopLeftRadius: '20%',
        borderBottomLeftRadius: '20%',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: '0px',
        width: '200px',
        minHeight: '80px',
        maxWidth: '200px',
        transform: 'translate(-35%, -80%)'
      }}>
      <img
        style={{
          height: '80px',
          minWidth: '80px',
          maxWidth: '80px',
          objectPosition: 'center',
          objectFit: 'cover',
          overflow: 'hidden',
          borderRadius: '50%',
          borderWidth: '10px',
          borderStyle: 'solid',
          borderColor: 'white',
          transform: 'translateX(-15px)',
          zIndex: '999'
        }}
        src={image}></img>
      <Box
        sx={{
          display: 'block',
          boxShadow: '0 12px 16px rgba(0, 0, 0, 0.2)',
          minWidth: '150px',
          transform: 'translate(-40px, 20px)',
          backgroundColor: 'white',
          maxHeight: '50px',
          p: 1,
          pl: 3,
          borderRadius: '12px',
          justifyContent: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
          zIndex: '-999'
        }}>
        <Typography sx={{ width: '100%' }}>
          <b>{title}</b>
        </Typography>
        {promoted && <PromotedText>↗ Promoted</PromotedText>}
      </Box>
    </Box>
  )
}
