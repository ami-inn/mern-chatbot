import express from 'express';
import { config } from 'dotenv';
config();
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
const app = express();
// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove this in production
app.use(morgan('dev'));
app.use('/api/v1', appRouter);
app.get('/test', (req, res, next) => {
    return res.send("test");
});
export default app;
//# sourceMappingURL=app.js.map