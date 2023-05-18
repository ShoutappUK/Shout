import React, { useState } from 'react'
import { TextField, Box } from '@mui/material'
import OpenStreetMap from './OpenStreetMap'
import MapPin from './MapPin'
import LocationDropdown from './LocationDropdown'
import { Location } from '../models/dataTypes'
import { DEFAULT_LOCATION } from './OpenStreetMap'

interface MapPickerProps {
  location: Location
  setLocation: (location: Location) => void
}

export default function MapPicker({ location, setLocation }: MapPickerProps) {
  const [searchText, setSearchText] = useState(DEFAULT_LOCATION.name)

  const handleLocationSelect = (name: string, lat: number, lng: number) => {
    setSearchText(name)
    setLocation({ name, lat, lng })
  }

  return (
    <>
      <TextField
        label="Search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        fullWidth
        sx={{ mb: 2, mt: 1 }}
      />
      <LocationDropdown searchText={searchText} onLocationSelect={handleLocationSelect} />
      {location && (
        <OpenStreetMap center={{ lat: location.lat, lng: location.lng }} style={{ height: '58vh' }}>
          <MapPin
            lat={location.lat}
            lng={location.lng}
            onPosChange={(lat, lng) => {
              setLocation({ name: '', lat, lng })
              setSearchText(`${lat}, ${lng}`)
            }}
            canMove={true}
          />
        </OpenStreetMap>
      )}
    </>
  )
}
