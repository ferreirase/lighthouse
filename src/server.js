import 'reflect-metadata'
import dotEnv from 'dotenv'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import routes from './routes/index.js'
import AppError from './errors/AppError.js'

dotEnv.config()

const app = express()

app.use([express.json(), cors(), routes])

app.use((err, request, response, _) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
)
