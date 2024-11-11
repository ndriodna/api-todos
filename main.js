import express from 'express';
import dotenv from "dotenv"
import router from './src/route/index.js';
const app = express()
const port = 3000
dotenv.config()

app.use(express.json())
app.use('/', router)
app.listen(port, '0.0.0.0', () => {
    console.log(`server listen port ${port}`)
})