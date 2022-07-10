import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import userRoutes from './routes/user.route';
import movieRoutes from './routes/movie.route';
import mongoose from 'mongoose';
import csvtojson from 'csvtojson';

const NAMESPACE = 'Server';
const router = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url)
    .then(() => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error: any) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/api', userRoutes);
router.use('/api', movieRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const connection = mongoose.connection;

connection.once('open', async function () {
    await init();
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

function init() {
    const arrayToInsert: any = [];
    csvtojson()
        .fromFile('./csv/movies-data.csv')
        .then((source) => {
            for (var i = 0; i < source.length; i++) {
                var oneRow = {
                    title: source[i]['Title'],
                    synopsis: source[i]['Synopsis'],
                    genre: source[i]['Genre'],
                    productionyear: source[i]['Production Year']
                };
                arrayToInsert.push(oneRow);
            }
            const movie: any = mongoose.connection.db.collection('movie').find({ title: { $in: ['Aquaman', 'Deadpool', 'Tomorrowland'] } });
            movie
                .count()
                .then((count: any) => {
                    if (count === 0) {
                        mongoose.connection.db.collection('movie').insertMany(arrayToInsert, (err: any, result: any) => {
                            if (err) console.log(err);
                            if (result) {
                                logging.info(NAMESPACE, 'Import CSV completed');
                            }
                        });
                    } else {
                        logging.info(NAMESPACE, 'Added move already');
                    }
                })
                .catch((error: any) => {
                    logging.error(NAMESPACE, error.message, error);
                });
        });
}
