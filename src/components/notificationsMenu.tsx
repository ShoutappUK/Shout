import React, { useState } from 'react'
import { Menu, MenuItem, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface NotificationsMenuProps {
  anchorEl: null | HTMLElement
  handleClose: () => void
  setNotificationCount: (count: number) => void
}

interface Notification {
  id: number
  text: string
}

const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ anchorEl, handleClose, setNotificationCount }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, text: 'Sample notification text 1...' },
    { id: 2, text: 'Sample notification text 2...' },
    { id: 3, text: 'Sample notification text 3...' }
  ])

  const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation()
    setNotifications(notifications.filter(notification => notification.id !== id))
    setNotificationCount(notifications.length - 1)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: '30ch',
          overflowWrap: 'break-word',
          whiteSpace: 'normal'
        }
      }}>
      {notifications.map(notification => (
        <MenuItem key={notification.id} onClick={handleClose}>
          <Typography
            style={{
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              flexGrow: 1,
              marginRight: '0.5rem'
            }}>
            {notification.text}
          </Typography>
          <IconButton edge="end" color="inherit" size="small" onClick={event => handleDismiss(event, notification.id)}>
            <CloseIcon />
          </IconButton>
        </MenuItem>
      ))}
      {notifications.length === 0 && (
        <MenuItem onClick={handleClose} disabled>
          <Typography
            style={{
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              flexGrow: 1,
              marginRight: '0.5rem'
            }}>
            All caught up, no notifications!
          </Typography>
        </MenuItem>
      )}
    </Menu>
  )
}

export default NotificationsMenu
