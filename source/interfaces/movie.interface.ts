import { Document } from 'mongoose';

export default interface IMovie extends Document {
    title: string;
    synopsis: string;
    genre: string;
    productionyear: string;
}
