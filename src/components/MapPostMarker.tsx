import React from 'react'
import { Location, Position } from '../models/dataTypes'
import MapPost from './MapPost'
import ReactComponentMarker from './ReactComponentMarker'

interface MapPostMarkerProps {
  location: Location
  image?: string
  title: string
  promoted?: boolean
  position: Position
  markerKey: React.Key | null | undefined
}

// Abstracts away some silly stuff about rendering react components inside leaflet
const MapPostMarker: React.FC<MapPostMarkerProps> = ({ position, markerKey, ...props }) => {
  return <ReactComponentMarker position={position} component={<MapPost {...props} />} />
}

export default MapPostMarker
