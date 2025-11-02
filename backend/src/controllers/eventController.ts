import { Request, Response } from "express";
import Event from "../models/Event";
import { AuthRequest } from "../middleware/authMiddleware";
import { getDistanceKm } from "../utils/distance";
import mongoose from "mongoose";

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, location, latitude, longitude, date, maxParticipants } = req.body;
    if (!title || !description || !location || !date || !maxParticipants) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const event = await Event.create({
      title,
      description,
      location,
      latitude,
      longitude,
      date,
      maxParticipants,
      createdBy: new mongoose.Types.ObjectId(req.user.id),
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listEvents = async (req: Request, res: Response) => {
  try {
    const { location, search, lat, lng, maxDistance } = req.query as {
      location?: string;
      search?: string;
      lat?: string;
      lng?: string;
      maxDistance?: string;
    };

    const filter: any = {};
    if (location) filter.location = { $regex: new RegExp(location, "i") };
    if (search) filter.$text = { $search: search };

    const events = await Event.find(filter).lean();

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxD = maxDistance ? parseFloat(maxDistance) : undefined;

      const withDistance = events
        .map((e) => {
          const distance = (e.latitude != null && e.longitude != null) ? getDistanceKm(userLat, userLng, e.latitude, e.longitude) : null;
          return { ...e, distance };
        })
        .filter((e) => (maxD != null ? (e.distance != null && e.distance <= maxD) : true))
        .sort((a, b) => {
          if (a.distance == null) return 1;
          if (b.distance == null) return -1;
          return a.distance - b.distance;
        });

      return res.json(withDistance);
    }

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).lean();
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};