import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateValidationError } from '@mui/x-date-pickers'
import React, { useState, useMemo, useEffect } from 'react'
import dayjs from 'dayjs'

interface AddPostDetailsProps {
  postTitle: string
  setPostTitle: (title: string) => void
  postDescription: string
  setPostDescription: (description: string) => void
  postDate: dayjs.Dayjs
  setPostDate: (date: dayjs.Dayjs) => void
  postSize: 'small' | 'medium' | 'large'
  setPostSize: (size: 'small' | 'medium' | 'large') => void
  image: File | null
  setImage: (file: File | null) => void
}

export default function AddPostDetails({
  postTitle,
  setPostTitle,
  postDescription,
  setPostDescription,
  postDate,
  setPostDate,
  postSize,
  setPostSize,
  image,
  setImage
}: AddPostDetailsProps) {
  const today = dayjs()
  const [error, setError] = useState<DateValidationError | null>(null)

  const [crop, setCrop] = useState({ aspect: 1 / 1 }) // Square crop
  const [resizedImageUrl, setResizedImageUrl] = useState('')

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select between today and a year from now'
      }

      case 'invalidDate': {
        return 'Your date is not valid'
      }

      default: {
        return ''
      }
    }
  }, [error])

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onload = e => {
        if (e.target !== null) {
          const imageObj = new Image()
          imageObj.src = e.target.result as string
          imageObj.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const maxSize = Math.min(imageObj.width, imageObj.height)
            const startX = (imageObj.width - maxSize) / 2
            const startY = (imageObj.height - maxSize) / 2
            canvas.width = maxSize
            canvas.height = maxSize

            if (ctx) {
              ctx.drawImage(imageObj, startX, startY, maxSize, maxSize, 0, 0, maxSize, maxSize)
              setResizedImageUrl(canvas.toDataURL())
            }
          }
        }
      }
      reader.readAsDataURL(image)
    } else {
      setResizedImageUrl('')
    }
  }, [image])

  return (
    <Grid container spacing={2} sx={{ height: '100%', alignItems: 'space-around' }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            width: '100%',
            height: '73%',
            border: `${image ? 'none' : 'dashed 2px #dadada'}`,
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
          {!image && <Typography variant="h6">Please select an image</Typography>}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt={image?.name}
              style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '20px' }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          <input
            accept="image/*"
            type="file"
            onChange={e => setImage(e.target.files?.[0] ?? null)}
            style={{ display: 'none' }}
            id="image-upload"
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Description"
          variant="filled"
          fullWidth
          multiline
          rows={3}
          value={postDescription}
          onChange={e => setPostDescription(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <DatePicker
          format="DD/MM/YYYY"
          label="Expiry Date"
          value={postDate}
          onError={newError => setError(newError)}
          slotProps={{
            textField: {
              helperText: errorMessage
            }
          }}
          minDate={today}
          maxDate={today.add(1, 'year')}
          onChange={e => {
            if (e === null) {
              throw new Error('Event is null')
            }
            setPostDate(e)
          }}
          sx={{ marginBottom: '16px' }}
        />
        <FormControl sx={{ margin: '8px', minWidth: '120px', marginBottom: '16px' }} size="small">
          <InputLabel id="size-selector">Post Size</InputLabel>
          <Select
            labelId="size-selector"
            value={postSize}
            label="Post Size"
            onChange={e => setPostSize(e.target.value as 'small' | 'medium' | 'large')}>
            <MenuItem value={'small'}>Small</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'large'}>Large</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
