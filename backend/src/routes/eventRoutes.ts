import { Router } from "express";
import { createEvent, listEvents, getEventById } from "../controllers/eventController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", listEvents);
router.get("/:id", getEventById);
router.post("/", protect, createEvent);

export default router;