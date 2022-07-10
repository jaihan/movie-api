import { NextFunction, Request, Response } from 'express';
import db from '../models';
const Movie = db.movie;

const getPagination = (page: Number | any, size: Number) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 1;

    return { limit, offset };
};

const getAllMovies = (req: Request, res: Response, next: NextFunction) => {
    const { page, size, title, synopsis, genre, productionyear }: any = req.query;

    let query: any = {};
    let sort: any = {};
    if (title) {
        query.title = { $regex: new RegExp(title), $options: 'i' };
        sort.title = -1;
    }
    if (synopsis) {
        query.synopsis = { $regex: new RegExp(synopsis), $options: 'i' };
        sort.synopsis = -1;
    }
    if (genre) {
        query.genre = { $regex: new RegExp(genre), $options: 'i' };
        sort.genre = -1;
    }
    if (productionyear) {
        query.productionyear = { $regex: new RegExp(productionyear), $options: 'i' };
        sort.productionyear = -1;
    }

    const options = {
        sort: sort
    };
    const { limit, offset } = getPagination(page, size);
    Movie.paginate(query, { offset, limit, options })
        .then((data: any) => {
            res.send({
                totalItems: data.totalDocs,
                movies: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1
            });
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || 'Failed to retrieve movie.'
            });
        });
};

const getMovie = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const movie = await Movie.findOne({ _id: id });

    if (!movie) {
        return res.status(404).json({ message: `Id "${id}" not found.` });
    }

    return res.status(200).json(movie);
};

export default { getAllMovies, getMovie };
