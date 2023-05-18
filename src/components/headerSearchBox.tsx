import React, { useState, useEffect } from 'react'
import { TextField, IconButton, Button } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useSearchParams, useLocation } from 'react-router-dom'

interface HeaderSearchBoxProps {
  onPost: () => void
  onExport: () => void
  onFeedSubmit: (searchValue: string) => void
  onMapSubmit: (searchValue: string) => void
}

const HeaderSearchBox: React.FC<HeaderSearchBoxProps> = ({ onPost, onExport, onFeedSubmit, onMapSubmit }) => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') ? decodeURIComponent(searchParams.get('query')?.trim() ?? '') : ''
  )

  useEffect(() => {
    if (!searchParams.get('query')) {
      setSearchValue('')
    }
  }, [location, searchParams])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = () => {
    if (location.pathname === '/map') {
      onMapSubmit(searchValue)
    } else {
      onFeedSubmit(searchValue)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', borderRadius: 4, height: 40, paddingBottom: 8 }}>
      <TextField
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
        style={{ width: 300, textAlign: 'center', background: 'white', borderRadius: 4 }}
        size="small"
        onKeyPress={event => {
          if (event.key === 'Enter') {
            handleSubmit()
          }
        }}
        InputProps={{
          style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
        }}
      />
      <IconButton
        size="large"
        type="submit"
        onClick={() => {
          handleSubmit()
        }}
        style={{ margin: 8, borderRadius: 4, height: 40 }}>
        <SearchIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={onPost} style={{ whiteSpace: 'nowrap' }}>
        + Post
      </Button>
      <Button variant="contained" color="primary" onClick={onExport} style={{ whiteSpace: 'nowrap', margin: 10 }}>
        Export to CSV
      </Button>
    </div>
  )
}

export default HeaderSearchBox
