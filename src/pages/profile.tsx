import { Avatar, Box, Button, ButtonGroup, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Paths from '../paths'
import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore'
import db from '../firebase/firebase'
import { Post, UserProfile } from '../models/dataTypes'
import PostTile from '../components/PostTile'
import '../styles/feed.css'

export default function Profile() {
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser

  const [page, setPage] = useState('Following')
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const fetchProfile = async () => {
    if (user) {
      const q = query(collection(db, 'user_profiles'))
      const querySnapshot = await getDocs(q)
      const profiles = querySnapshot.docs.map(doc => doc.data() as UserProfile)
      profiles.forEach(profile => {
        if (profile.uid === user.uid) {
          console.log(profile)
          setProfile(profile)
          return
        }
      })
    } else {
      console.log('no user')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [page])

  const handleSignInClick = () => {
    navigate(Paths.SignIn)
  }

  const handleSignUpClick = () => {
    navigate(Paths.SignUp)
  }

  const handleSignOutClick = () => {
    auth.signOut()
    navigate(Paths.Root)
  }

  let profileContent = <div></div>

  if (user) {
    const displayName = user.displayName
    const email = user.email
    const uid = user.uid
    profileContent = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
          <Avatar sx={{ minHeight: '84px', minWidth: '84px', backgroundColor: 'orange', fontSize: '40px' }}>JB</Avatar>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', pt: 1, pl: 0.5 }}>
            <Typography variant="h4">{uid}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: 2, pl: 0.5 }}>
                <b>Following:</b>12
              </Typography>
              <Typography>
                <b>Followers:</b>124
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleSignOutClick} sx={{ my: 1, width: '15vh' }}>
            Sign Out
          </Button>
        </Box>
      </Box>
    )
  } else {
    profileContent = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: 15 }}>
        <Button variant="contained" onClick={handleSignInClick} sx={{ mb: 2 }}>
          Sign In
        </Button>
        <Button variant="contained" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </Box>
    )
  }

  function renderFollows(follows: string[]) {
    return follows.map((uid, index) => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} key={index}>
        <Avatar>{uid.substring(0, 2).toUpperCase()}</Avatar>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 1, alignContent: 'center' }}>
          <Typography>{uid}</Typography>
        </Box>
      </Box>
    ))
  }

  let followContent = <div></div>

  if (page === 'Following') {
    console.log('hi')
    followContent = <div>{profile && renderFollows(profile.following)}</div>
  } else if (user && page === 'followers') {
    followContent = <div>{profile && renderFollows(profile.followers)}</div>
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
      }}>
      <Box sx={{ display: 'flex', width: '50vh', my: 3, justifyContent: 'center' }}>{profileContent}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup variant="text">
          <Button
            size="large"
            onClick={() => {
              setPage('Following')
            }}>
            Following
          </Button>
          <Button
            size="large"
            onClick={() => {
              setPage('Followers')
            }}>
            Followers
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        style={{ transform: 'translateX(110px)' }}>
        <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', my: 0.5 }}>
          <Avatar sx={{ backgroundColor: 'purple', mr: 0.5 }}>SA</Avatar>
          <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
            <Typography>SabrinaC99</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', my: 0.5 }}>
          <Avatar sx={{ backgroundColor: 'green', mr: 0.5 }}>JJ</Avatar>
          <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
            <Typography>JJBpineapple</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', my: 0.5 }}>
          <Avatar sx={{ backgroundColor: 'red', mr: 0.5 }}>AM</Avatar>
          <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
            <Typography>AppleMan53</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', my: 0.5 }}>
          <Avatar sx={{ backgroundColor: 'gray', mr: 0.5 }}>JL</Avatar>
          <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
            <Typography>JohnLemONE</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
const followers = ['SabrinaC99', 'JJBpineapple', 'AppleMan53', 'JohnLemONE']
