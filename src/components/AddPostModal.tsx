import React, { useContext, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Step,
  StepLabel,
  Stepper
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LocationDropdown from './LocationDropdown'
import { Location } from '../models/dataTypes'
import { DEFAULT_LOCATION } from './OpenStreetMap'
import AddPostDetails from './AddPostDetails'
import MapPicker from './MapPicker'
import dayjs from 'dayjs'
import db from '../firebase/firebase'
import { collection, addDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
interface AddPostModalProps {
  open: boolean
  onClose?: () => void
}

const AddPostModal: React.FC<AddPostModalProps> = ({ open, onClose = () => {} }) => {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION)
  const [activeStep, setActiveStep] = useState(0)

  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [postDate, setPostDate] = useState(dayjs())
  const [postSize, setPostSize] = useState('small')
  const [image, setImage] = useState<File | null>(null)

  const steps = ['Choose Location', 'Add Details']

  const storage = getStorage()
  const handlePost = async () => {
    if (!postTitle || !postDescription || !location || !postSize || !postDate) {
      console.error('Error adding document: Missing required fields')
      return
    }

    const postRef = collection(db, 'posts')
    const doc = {
      title: postTitle,
      description: postDescription,
      location,
      size: postSize,
      date: postDate.toISOString()
    }
    try {
      const docRef = await addDoc(postRef, doc)
      const postId = docRef.id
      if (image) {
        const downloadUrl = await uploadImage(postId, image)
        await updateDoc(docRef, { image: downloadUrl })
      }
      console.log('Document written with ID: ', postId)
      window.location.reload()
    } catch (e) {
      console.error('Error adding document: ', e)
    }

    onClose()
  }

  const uploadImage = async (postId: string, image: File) => {
    const storageRef = ref(storage, `images/${postId}`)
    await uploadBytes(storageRef, image)
    const downloadUrl = await getDownloadURL(storageRef)
    return downloadUrl
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {`New Post: ${steps[activeStep]}`}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DialogContent dividers>
        {activeStep === 0 ? (
          <MapPicker location={location} setLocation={setLocation} />
        ) : (
          <AddPostDetails
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postDescription={postDescription}
            setPostDescription={setPostDescription}
            postDate={postDate}
            setPostDate={setPostDate}
            postSize={postSize as 'small' | 'medium' | 'large'}
            setPostSize={setPostSize}
            image={image}
            setImage={setImage}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        {activeStep !== steps.length - 1 ? (
          <Button onClick={handleNext} disabled={!location?.name}>
            Next
          </Button>
        ) : (
          <Button onClick={handlePost} variant="contained" color="primary">
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default AddPostModal
