import React, { useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'
import { divIcon } from 'leaflet'
import ReactDOM from 'react-dom'
import { Position } from '../models/dataTypes'
import L from 'leaflet'

type ReactComponentMarkerProps = {
  position: Position
  component: React.ReactElement
}

const ReactComponentMarker: React.FC<ReactComponentMarkerProps> = ({ position, component }) => {
  const map = useMap()
  const markerRef = useRef<L.Marker | null>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!markerRef.current) {
      const el = document.createElement('div')
      setContainer(el)
    }
  }, [])

  useEffect(() => {
    if (container) {
      const customIcon = divIcon({
        className: '',
        html: `<div>${container.outerHTML}</div>`
      })

      markerRef.current = L.marker([position.lat, position.lng], { icon: customIcon, riseOnHover: true }).addTo(map)
    }
  }, [container, map, position.lat, position.lng])

  if (container) {
    return ReactDOM.createPortal(component, container)
  } else {
    return null
  }
}

export default ReactComponentMarker
