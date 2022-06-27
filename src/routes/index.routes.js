import { Router } from 'express';
import gameRouter from './games';
import uploadRouter from './upload';
import genreRouter from './genres';

const router = Router();

router.use("/games", gameRouter);
router.use("/genres", genreRouter);
router.use("/upload", uploadRouter);


export default router;