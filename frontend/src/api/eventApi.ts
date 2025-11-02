// src/api/eventApi.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const api = axios.create({ baseURL: `${API_BASE}/api` });

// attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("me_token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type BackendEvent = {
  _id: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  distance?: number | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
};

function mapToFrontend(be: BackendEvent) {
  return {
    id: be._id,
    _id: be._id,
    title: be.title,
    description: be.description,
    location: be.location,
    latitude: be.latitude,
    longitude: be.longitude,
    date: be.date,
    max_participants: be.maxParticipants,
    current_participants: be.currentParticipants,
    distance: be.distance ?? null,
    created_at: be.createdAt,
    updated_at: be.updatedAt,
    created_by: be.createdBy,
  };
}

export async function listEvents(params?: Record<string, any>) {
  const resp = await api.get("/events", { params });
  const arr: BackendEvent[] = resp.data || [];
  return arr.map(mapToFrontend);
}

export async function getEvent(id: string) {
  const resp = await api.get(`/events/${id}`);
  return mapToFrontend(resp.data);
}

export async function createEvent(payload: {
  title: string;
  description: string;
  location: string;
  date: string;
  latitude?: number;
  longitude?: number;
  maxParticipants: number;
}) {
  const body = {
    title: payload.title,
    description: payload.description,
    location: payload.location,
    date: payload.date,
    latitude: payload.latitude,
    longitude: payload.longitude,
    maxParticipants: payload.maxParticipants,
  };
  const resp = await api.post("/events", body);
  return mapToFrontend(resp.data);
}

export async function registerForEvent(id: string) {
  // backend should implement POST /events/:id/register and return updated event
  const resp = await api.post(`/events/${id}/register`);
  return mapToFrontend(resp.data);
}
