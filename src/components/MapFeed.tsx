import React, { useState, useEffect, useContext } from 'react'
import data from '../dummyData/dummyMapPost'
import { Location } from '../models/dataTypes'
import 'leaflet/dist/leaflet.css'
import MapPostMarker from './MapPostMarker'
import { useLocation } from 'react-router-dom'
import Map, { DEFAULT_LOCATION, SOUTHAMPTON, LONDON } from './OpenStreetMap'
import { FeedContext } from '../context/FeedContext'

export default function MapFeed() {
  const [center, setCenter] = useState({ lat: DEFAULT_LOCATION.lat, lng: DEFAULT_LOCATION.lng })
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get('query')
  const mapPosts = useContext(FeedContext)

  useEffect(() => {
    if (query?.toLowerCase() === 'london') {
      setCenter({ lat: LONDON.lat, lng: LONDON.lng })
    } else {
      setCenter({ lat: DEFAULT_LOCATION.lat, lng: DEFAULT_LOCATION.lng })
    }
  }, [query])

  return (
    <Map center={center} style={{ height: '92.5vh', width: '100wh' }}>
      {mapPosts.map(
        (
          post: { location: Location; image: string | undefined; title: string; promoted?: boolean },
          index: React.Key | null | undefined
        ) => (
          <MapPostMarker
            position={{ lat: post.location.lat, lng: post.location.lng }}
            {...post}
            markerKey={index}
            key={index}
          />
        )
      )}
    </Map>
  )
}
