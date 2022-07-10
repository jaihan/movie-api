import mongoose from 'mongoose';
import user from './user.model';
import movie from './movie.model';

mongoose.Promise = global.Promise;

const db: any = {};

db.mongoose = mongoose;
db.user = user;
db.movie = movie;

export default db;
