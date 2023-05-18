import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export const SOUTHAMPTON = { name: 'Southampton', lat: 50.91, lng: -1.4 }
export const LONDON = { name: 'London', lat: 51.509865, lng: -0.118092 }

export const DEFAULT_LOCATION = SOUTHAMPTON
const DEFAULT_ZOOM = 16

function ChangeMapView({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, DEFAULT_ZOOM)
  }, [map, center])
  return null
}

interface MapProps {
  center?: { lat: number; lng: number }
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function Map({ center = DEFAULT_LOCATION, children, style }: MapProps) {
  const [mapCenter, setMapCenter] = useState(center)

  useEffect(() => {
    setMapCenter(center)
  }, [center])

  return (
    <MapContainer center={mapCenter} zoom={DEFAULT_ZOOM} scrollWheelZoom={true} doubleClickZoom={false} style={style}>
      <ChangeMapView center={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}
