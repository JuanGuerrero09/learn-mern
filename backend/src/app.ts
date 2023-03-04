import express, { NextFunction, Request, Response } from "express";
import notesRoutes from './routes/notes'
import morgan from 'morgan'
import "dotenv/config";

const app = express();

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
  next(Error('endpoint not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req:Request, res:Response, next:NextFunction) => {
  console.error(error)
  let errorMesage = 'an unknown error ocurred'
  if (error instanceof Error) errorMesage = error.message
  res.status(500).json({error: errorMesage})
})

export default app