import express from 'express';
import router from './src/routes/index.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/', router)
app.listen(port, process.env.SERVER, () => {
    console.log(`server listen ${process.env.SERVER}:${port}`)
})