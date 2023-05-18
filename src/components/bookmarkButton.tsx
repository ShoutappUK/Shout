import { BookmarkAdd, BookmarkAdded } from '@mui/icons-material'
import { Button, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'

type Props = {
  saved_post: boolean
  size: string
}

export default function BookmarkButton(props: Props) {
  const { saved_post, size } = props
  const [saved, setSaved] = useState(saved_post)

  let savedButton = <div></div>

  if (saved) {
    savedButton = (
      <Tooltip title="Remove from bookmarks">
        <Button
          variant="contained"
          onClick={() => {
            setSaved(false)
          }}
          sx={{ minWidth: '32px', minheight: '32px', justifyContent: 'center', borderRadius: '32x', p: 0.8 }}>
          <BookmarkAdded fontSize="medium" />
        </Button>
      </Tooltip>
    )
  } else if (size === 'large') {
    savedButton = (
      <Tooltip title="Add to bookmarks">
        <Button
          variant="contained"
          onClick={() => {
            setSaved(true)
          }}
          sx={{ minWidth: '32px', minheight: '32px', justifyContent: 'center', borderRadius: '32x', p: 0.8 }}>
          <BookmarkAdd fontSize="medium" />
          <Typography>Save Deal</Typography>
        </Button>
      </Tooltip>
    )
  } else {
    savedButton = (
      <Tooltip title="Add to bookmarks">
        <Button
          variant="contained"
          onClick={() => {
            setSaved(true)
          }}
          sx={{ minWidth: '32px', minheight: '32px', justifyContent: 'center', borderRadius: '32x', p: 0.8 }}>
          <BookmarkAdd fontSize="medium" />
        </Button>
      </Tooltip>
    )
  }

  return <div>{savedButton}</div>
}
