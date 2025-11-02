export interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  distance?: number | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
