import mongoose, { Schema } from 'mongoose';
import IMovie from '../interfaces/movie.interface';
import mongoosePaginate from 'mongoose-paginate-v2';

const MovieSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        synopsis: { type: String, required: true },
        genre: { type: String, required: true },
        productionyear: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

MovieSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

MovieSchema.plugin(mongoosePaginate);

export default mongoose.model<IMovie>('Movie', MovieSchema, 'movie');
