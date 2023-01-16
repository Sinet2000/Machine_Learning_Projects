import express from 'express'
import predictRouter from './routes/predict'
import uploadRouter from './routes/upload'

require("dotenv").config();

const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

const app = express()
const PORT = process.env.BACKEND_PORT || 5000
app.use(predictRouter)
app.use(uploadRouter)

app.listen(PORT, () => {
  console.log(`Server running at ${backendUrl}:${PORT}`)
})