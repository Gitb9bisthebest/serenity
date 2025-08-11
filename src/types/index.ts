export interface Room {
  id: string
  name: string
  price: number
  image: string
  features: string[]
  description: string
  maxGuests: number
  size: number
}

export interface Amenity {
  id: string
  title: string
  description: string
  icon: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: "room" | "amenity" | "exterior" | "dining"
  span?: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    instagram: string
    facebook: string
  }
}
