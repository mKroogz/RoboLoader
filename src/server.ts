/** source/server.ts */
import * as fs from 'fs';
import * as util from 'util'
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

const https = require('node:https');

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());


/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */

 
const readFile = util.promisify(fs.readFile);
 
async function startServer() {
  const [key, cert] = await Promise.all([
    readFile('./key.pem'),
    readFile('./certificate.pem')
]);
  const PORT: any = process.env.PORT ?? 5001;
  https.createServer({ key, cert }, (router))
  .listen(PORT, () => console.log(`The server is running on port ${PORT}`))
}

startServer()