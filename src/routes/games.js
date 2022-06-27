import { Router } from "express";
const router = Router();

// Importo los controllers de cada ruta
import { getGames, getGamesbyId } from '../controllers/games.controllers';

router.get("/", getGames);
router.get("/:id", getGamesbyId);


export default router;