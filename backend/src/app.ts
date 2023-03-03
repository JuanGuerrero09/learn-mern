import express, { NextFunction, Request, Response } from "express";
import NoteModel from './models/note'
import "dotenv/config";

const app = express();

app.get("/", async (req, res, next) => {
  try{
    // throw new Error('lmao')
    const notes = await NoteModel.find().exec()
    res.status(200).json(notes)
  }
  catch(error){
    next(error)
  }
});

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