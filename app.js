import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import authRouter from './routes/auth.route.js';
import bookRouter from './routes/book.route.js';
import borrowRouter from './routes/borrow.route.js';

const app = express();

// express middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir : '/tmp/'
    // limits : {fileSize : 50 * 1024 * 1024}
}))
app.use(express.json());
app.use(cookieParser());

app.get('/test', (req, res) => {
    res.send('Welcome');
})


// routes
app.get('/', (req, res) => {
    res.send('test routes');
})
app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/book' , bookRouter)
app.use('/api/v1/borrow' , borrowRouter)

// error middleware
app.use(errorMiddleware)

export { app }
