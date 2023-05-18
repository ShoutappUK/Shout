import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Paths from '../paths'

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth()

  const navigate = useNavigate()

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    setSubmitted(true)

    if (isValid()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
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
    return email.length > 0 && password.length > 0
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 15 }}>
      <Box sx={{ width: '50vw', display: 'flex', flexDirection: 'column' }}>
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
          helperText={submitted && email.length === 0 ? 'Please enter valid email' : ''}
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
          helperText={submitted && password.length === 0 ? 'Please enter valid password' : ''}
        />

        <FormControlLabel control={<Checkbox value="remember" color="primary" defaultChecked />} label="Remember me" />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit" sx={{ mt: 1, mb: 1, p: 1, width: '15vw' }} onClick={handleSubmit}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
