export interface CustomError {
  status: number;
  msg: string;
}

export interface AuthError extends Error {
  errorInfo: {
    code: string;
    message: string;
  };
  codePrefix: string;
}

export interface ParkRequest {
  user_id: string;
  name: string;
  desc: string;
  size: number;
  features: {
    isFree: boolean;
    isWellLit: boolean;
    isFreeParking: boolean;
    isParking: boolean;
    hasAgilityEquipment: boolean;
    isFullyEnclosed: boolean;
    hasDisabledAccess: boolean;
  };
  opening_hours: {
    [key: string]: string;
  };
  address: {
    firstLine: string;
    secondLine: string;
    postCode: string;
    city: string;
  };
  image_url: string;
  website_url: string;
  phone_number: string;
}

export interface Park extends ParkRequest {
  id: string;
  user_id: string;
  name: string;
  desc: string;
  size: number;
  current_average_rating: number;
  current_review_count: number;
  features: {
    isFree: boolean;
    isWellLit: boolean;
    isFreeParking: boolean;
    isParking: boolean;
    hasAgilityEquipment: boolean;
    isFullyEnclosed: boolean;
    hasDisabledAccess: boolean;
  };
  opening_hours: {
    [key: string]: string;
  };
  address: {
    firstLine: string;
    secondLine: string;
    postCode: string;
    city: string;
  };
  location: {
    long: number;
    lat: number;
  };
  image_url: string;
  website_url: string;
  phone_number: string;
}

export interface ParkUpdateRequest {
  park_id: string;
  name: string;
  desc: string;
  size: number;
  features: {
    isFree: boolean;
    isWellLit: boolean;
    isFreeParking: boolean;
    isParking: boolean;
    hasAgilityEquipment: boolean;
    isFullyEnclosed: boolean;
    hasDisabledAccess: boolean;
  };
  opening_hours: {
    [key: string]: string;
  };
  address: {
    firstLine: string;
    secondLine: string;
    postCode: string;
    city: string;
  };
  location: {
    long: number;
    lat: number;
  };
  image_url: string;
  website_url: string;
  phone_number: string;
}

export interface LocationCords {
  long: number;
  lat: number;
}

export interface Review {
  id: string;
  park_id: string;
  user_id: string;
  rating: number;
  title: string;
  safety: number;
  AsDescribed: boolean;
  body: string;
  votes: number;
}

export interface ReviewRequest {
  park_id: string;
  user_id: string;
  rating: number;
  safety: number;
  AsDescribed: boolean;
  title: string;
  body: string;
}

export interface ReviewUpdateRequest {
  review_id: string;
  rating: number;
  safety: number;
  AsDescribed: boolean;
  title: string;
  body: string;
}

export interface ReviewVoteRequest {
  review_id: string;
  increment: number;
}

export interface ParkQuery {
  city?: string;
  rating?: number;
  isFree?: boolean;
  isWellLit?: boolean;
  isFreeParking?: boolean;
  isParking?: boolean;
  hasAgilityEquipment?: boolean;
  isFullyEnclosed?: boolean;
  hasDisabledAccess?: boolean;
  orderBy?: string;
}

export interface UserRequest {
  email: string;
  username: string;
  password: string;
  type: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  type: string;
  isVerified: boolean;
  reviewUpvotes: number;
}

export interface UserUpvoteRequest {
  user_id: string;
  increment: number;
}
