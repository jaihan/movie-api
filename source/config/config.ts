import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'movie';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'movie';
const MONGO_HOST = process.env.MONGO_HOST || `localhost`;
const MONGO_DB = process.env.MONGO_DB || `movieDB`;


const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    db: MONGO_DB,
    options: MONGO_OPTIONS,
    // url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`
    url: "mongodb+srv://movie:superpassword@cluster0.ulxv5.mongodb.net/movieDB?retryWrites=true&w=majority"
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'issuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'secret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;

// export const MONGO_USERNAME="movie";
// export const MONGO_PASSWORD="iGsxpfClfyHxyXlx";
// export const MONGO_HOST="cluster0.zz1nu.mongodb.net";
// export const MONGO_DB="movieDB";