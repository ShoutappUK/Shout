export interface Location {
  name: string
  lat: number
  lng: number
}

export interface Position {
  lat: number
  lng: number
}

export interface Post {
  title: string
  description: string
  location: Location
  image: string
  size: string
  date: string
  poster_uid: string
  promoted?: boolean
}

export interface UserProfile {
  uid: string
  followers: string[]
  following: string[]
  bookmarks: string[]
}
