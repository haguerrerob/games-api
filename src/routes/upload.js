import { Router } from "express";
const router = Router();

// Importo los controllers de cada ruta
import { uploadThumbnailBW } from '../controllers/upload.controllers';

router.get("/:thumbnail_half", uploadThumbnailBW);


export default router;