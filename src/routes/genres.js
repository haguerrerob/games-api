import { Router } from "express";
const router = Router();

// Importo los controllers de cada ruta
import { getGenre } from '../controllers/genres.controllers.js';

router.get("/", getGenre);

export default router;