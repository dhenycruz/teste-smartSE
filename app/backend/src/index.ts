import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express()
const { PORT } = process.env;

app.get('/', (req: Request, res: Response) => {
    res.send('Wellcome to API')
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})