import React from 'react'
import OpenStreetMap, { SOUTHAMPTON } from './OpenStreetMap'
import MapPin from './MapPin'

interface MapWithPostPin {
  lat: number
  lng: number
  onPosChange: (lat: number, lng: number) => void
  style?: React.CSSProperties
}

// Must set height and width in style e.g.
// style = { height: '92.5vh', width: '100wh' }
const OpenStreetMapWithPostPin: React.FC<MapWithPostPin> = ({
  lat = SOUTHAMPTON.lat,
  lng = SOUTHAMPTON.lng,
  onPosChange,
  style
}) => {
  return (
    <OpenStreetMap center={{ lat, lng }} style={style}>
      <MapPin lat={lat} lng={lng} onPosChange={onPosChange} canMove={false} />
    </OpenStreetMap>
  )
}

export default OpenStreetMapWithPostPin
