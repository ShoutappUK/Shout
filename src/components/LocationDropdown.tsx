import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?'
const SEARCH_DELAY = 0.2

interface LocationDropdownItem {
  place_id: string
  display_name: string
  lat: string
  lon: string //isn't lng because get request returns a lon not a lng
}

interface LocationDropdownProps {
  searchText: string | null
  onLocationSelect: (name: string, lat: number, lng: number) => void
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({ searchText, onLocationSelect }) => {
  const [listPlace, setListPlace] = useState<LocationDropdownItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true) // Track the first load

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false) // Update first load state and skip the initial search
      return
    }

    const abortController = new AbortController()
    handleSearch(abortController.signal)
    return () => {
      abortController.abort()
    }
  }, [searchText])

  const handleSearchResult = (result: LocationDropdownItem[]) => {
    setIsLoading(false)
    if (result.length > 0) {
      setListPlace(result)
    }
  }

  const handleSearch = async (signal: AbortSignal) => {
    if (searchText === null || selected) {
      return
    }
    if (searchText === null) {
      return
    } else {
      const params = new URLSearchParams({
        q: searchText,
        format: 'json',
        addressdetails: '1',
        polygon_geojson: '0'
      })
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
        signal
      }
      try {
        setIsLoading(true)
        setListPlace([])
        const response = await fetch(`${NOMINATIM_BASE_URL}${params.toString()}`, requestOptions)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result: LocationDropdownItem[] = await response.json()
        handleSearchResult(result)
      } catch (error) {
        setIsLoading(false)
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching data:', error)
        }
      }
    }
  }

  const handleLocationSelect = (selectedLocation: LocationDropdownItem) => {
    setListPlace([])
    setIsLoading(false)
    setSelected(true)
    onLocationSelect(selectedLocation.display_name, parseFloat(selectedLocation.lat), parseFloat(selectedLocation.lon))

    setTimeout(() => {
      setSelected(false)
    }, 100)
  }

  if (listPlace.length === 0 && !isLoading) {
    return null
  }

  return (
    <Box
      sx={{
        width: '94.7%',
        position: 'absolute',
        zIndex: 10000,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        backgroundColor: 'white'
      }}>
      <List component="nav" aria-label="suggested locations" sx={{ maxHeight: '200px', overflow: 'auto' }}>
        {isLoading ? (
          <ListItemButton>
            <Skeleton variant="text" width="100%" />
          </ListItemButton>
        ) : (
          listPlace.map(item => (
            <React.Fragment key={item.place_id}>
              <ListItemButton
                onClick={() => {
                  handleLocationSelect(item)
                }}>
                <ListItemText primary={item.display_name} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  )
}

export default LocationDropdown
