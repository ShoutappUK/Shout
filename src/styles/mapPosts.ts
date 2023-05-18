import { Typography, Paper } from '@mui/material'
import { styled } from '@mui/system'

export const StyledPaper = styled(Paper)({
  position: 'relative',
  borderTopLeftRadius: '20%',
  borderBottomLeftRadius: '20%',
  display: 'flex',
  flexDirection: 'row',
  paddingRight: '0px',
  width: '200px',
  minHeight: '80px',
  maxWidth: '200px',
  boxShadow: '0 12px 16px rgba(0, 0, 0, 0.2)',
  transform: 'translate(-46%, -100%)',
  '&:hover': {
    transform: 'scale(1.05)'
  },
  '&:active': {
    transform: 'scale(0.95)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-30px',
    left: 'calc(50% - 10px)',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '20px 10px 0 10px',
    borderColor: 'white transparent transparent transparent'
  }
})

export const MapPostImage = styled('img')({
  height: '80px',
  objectPosition: 'center',
  objectFit: 'contain',
  overflow: 'hidden',
  borderRadius: '50%'
})

export const MapPostText = styled(Typography)({
  fontWeight: 'bold',
  overflow: 'hidden',
  whiteSpace: 'normal'
})

export const PromotedText = styled(Typography)({
  color: '#49454F',
  fontWeight: 'normal'
})
