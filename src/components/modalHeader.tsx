import { PersonAdd } from '@mui/icons-material'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import BookmarkButton from './bookmarkButton'

type Props = {
  saved: boolean
  uid: string
}
export default function ModalHeader(props: Props) {
  const { saved, uid } = props
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex' }}>
        <Avatar sx={{ backgroundColor: 'orange' }}>JB</Avatar>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 1, alignContent: 'center' }}>
          <Typography>{uid}</Typography>
        </Box>
        <IconButton>
          <PersonAdd />
        </IconButton>
      </Box>
      <BookmarkButton saved_post={saved} size="large" />
    </Box>
  )
}
