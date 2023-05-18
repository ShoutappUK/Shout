import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, IconButton, Badge, Button, Modal } from '@mui/material'
import { Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import HeaderSearchBox from './headerSearchBox'
import NotificationsMenu from './notificationsMenu'
import CampaignIcon from '@mui/icons-material/Campaign'
import Paths from '../paths'
import AddPostModal from './AddPostModal'
import { Location } from '../models/dataTypes'
import { FeedContext } from '../context/FeedContext'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notificationCount, setNotificationCount] = useState(3)
  const [addPost, setAddPost] = useState(false)
  const handleAddPost = () => setAddPost(true)
  const handleCloseAddPost = () => setAddPost(false)
  const feedData = useContext(FeedContext)

  const handleLogoClick = () => {
    navigate(Paths.Root)
  }

  const handleFeedClick = () => {
    navigate(Paths.Feed)
  }

  const handleMapClick = () => {
    navigate(Paths.Map)
  }

  const handleFeedSubmit = (searchValue: string) => {
    const params = new URLSearchParams()
    params.append('query', searchValue || '')
    navigate(`${Paths.Feed}?${params.toString()}`)
  }

  const handleMapSubmit = (searchValue: string) => {
    const params = new URLSearchParams()
    params.append('query', searchValue || '')
    navigate(`${Paths.Map}?${params.toString()}`)
  }

  const handleProfileClick = () => {
    navigate(Paths.Profile)
  }

  const handleNotificationsMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationsMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSavedClick = () => {
    navigate(Paths.Bookmarks)
  }

  const handleExportFeed = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Title,Description,Location Name,Latitude,Longitude,Image,Expiry Date,Promoted?\n';
  
    feedData.forEach(post => {
      const { title, description, location, image, date, promoted } = post;
      const { name: locationName, lat: locationLat, lng: locationLng } = location;
      const valPromoted = promoted ? "Yes" : "No"
      csvContent += `"${title}","${description}","${locationName.replace(/,/g, '')}",${locationLat},${locationLng},"${image}","${date}","${valPromoted}"\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'feed.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <header>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="0 1rem">
        <Box display="flex" alignItems="center" paddingBottom={1}>
          <Box marginRight={2}>
            <IconButton onClick={handleLogoClick}>
              <CampaignIcon />
            </IconButton>
          </Box>

          <Button variant="outlined" onClick={handleFeedClick} sx={{ mr: 2 }}>
            Feed
          </Button>
          <Button variant="outlined" onClick={handleMapClick} sx={{ mr: 2 }}>
            Map
          </Button>
          <Button variant="outlined" onClick={handleSavedClick}>
            Bookmarks
          </Button>
        </Box>

        <Box sx={{ display: 'flex', mr: 20, width: '30vw' }}>
          <HeaderSearchBox onPost={handleAddPost} onExport={handleExportFeed} onFeedSubmit={handleFeedSubmit} onMapSubmit={handleMapSubmit} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: '5vw' }}>
          <NotificationsMenu
            anchorEl={anchorEl}
            handleClose={handleNotificationsMenuClose}
            setNotificationCount={setNotificationCount}
          />
          <IconButton onClick={handleNotificationsMenuClick}>
            <Badge badgeContent={notificationCount} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleProfileClick}>
            <PersonIcon />
          </IconButton>
        </Box>

        <AddPostModal
          open={addPost}
          onClose={() => {
            setAddPost(false)
          }}
        />
      </Box>
    </header>
  )
}

export default Header
