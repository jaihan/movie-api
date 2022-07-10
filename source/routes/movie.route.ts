import express from 'express';
import controller from '../controllers/movie.controller';

const router = express.Router();

router.get('/movies', controller.getAllMovies);
router.get('/movie/:id', controller.getMovie);

export = router;
