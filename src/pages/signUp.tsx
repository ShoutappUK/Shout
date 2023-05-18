import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Paths from '../paths'
import { addDoc, collection } from 'firebase/firestore'
import db from '../firebase/firebase'

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const auth = getAuth()

  const navigate = useNavigate()
  const createProfile = async () => {
    const profileRef = collection(db, 'user_profiles')
    const doc = {
      uid: auth?.currentUser!.uid,
      followers: [],
      following: [],
      bookmarks: []
    }
    try {
      const docRef = await addDoc(profileRef, doc)
      console.log('User profile created for: ', auth?.currentUser!.uid)
    } catch (e) {
      console.error('Error creating user profile: ', e)
    }
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    setSubmitted(true)

    if (isValid()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
          updateProfile(user, {
            displayName: displayName
          })
            .then(() => {
              createProfile()
            })
            .catch(error => {
              // An error occurred
              console.log(error)
            })
          navigate(Paths.Root)
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('incorrect email or password')
        })
    } else {
      console.log('incorrect email or password')
    }
  }

  function isValid(): boolean {
    return email.length > 0 && password.length > 0 && displayName.length > 0
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 15 }}>
      <Box sx={{ width: '50vw', display: 'flex', flexDirection: 'column' }}>
        <TextField
          margin="dense"
          required
          fullWidth
          id="username"
          label="Username"
          name="UserName"
          autoComplete="Username"
          autoFocus
          onChange={e => setDisplayName(e.target.value)}
          error={submitted && displayName.length === 0}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => setEmail(e.target.value)}
          error={submitted && email.length === 0}
        />
        <TextField
          margin="dense"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          error={submitted && password.length === 0}
        />

        <FormControlLabel control={<Checkbox value="remember" color="primary" defaultChecked />} label="Remember me" />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit" sx={{ mt: 1, mb: 1, p: 1, width: '15vw' }} onClick={handleSubmit}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
