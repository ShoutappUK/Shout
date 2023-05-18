import React from 'react'
import { Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { PointTuple } from 'leaflet'

interface MapPin {
  lat: number
  lng: number
  onPosChange: (lat: number, lng: number) => void
  canMove?: boolean
}

const MapPin: React.FC<MapPin> = ({ lat, lng, onPosChange, canMove = false }) => {
  const map = useMapEvents({
    click: (e: L.LeafletMouseEvent) => {
      if (canMove) {
        onPosChange(e.latlng.lat, e.latlng.lng)
      }
    }
  })

  const locationIcon = L.icon({
    iconUrl: 'https://i.pinimg.com/originals/7f/6c/dc/7f6cdce4c15b2d1548b618ce5573bfd3.png',
    iconSize: [59, 33] as PointTuple,
    iconAnchor: [27, 25] as PointTuple,
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return <Marker position={{ lat: lat, lng: lng }} icon={locationIcon}></Marker>
}

export default MapPin
