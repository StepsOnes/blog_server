import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
dotenv.config()

const app = express()

// Constants
const PORT = process.env.PORT || 8000
const DATABASE__URL = process.env.DATABASE__URL

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

// Start Functionx
const start = () => {
	try {
		mongoose
			.connect(DATABASE__URL)
			.then(res => {
				if (res) {
					console.log('Connect to MongoDB')
				}
			})
			.catch(err => {
				if (err) {
					console.log('DB not connected')
				}
			})

		app.listen(PORT, () => {
			console.log(`Server is Active - http://localhost:${PORT}`)
		})
	} catch (err) {
		console.log(`Server crashed, error - ${err}`)
	}
}

start()
