import express from 'express'
import { config } from 'dotenv'
config()

const app = express()

// middlewares
app.use(express.json()) 

app.get('/test',(req,res,next) => {
  return res.send("test")

})


export default app