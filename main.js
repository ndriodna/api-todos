import express from 'express';
import router from './src/routes/index.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(port, process.env.SERVER, () => {
    console.log(`server listen ${process.env.SERVER}:${port}`)
})