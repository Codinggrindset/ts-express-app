import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { router } from './routers'
import authRoutes from './routes/authentication'
import './routes/authentication/googleAuth'
import passport from 'passport'
import { googleRoute } from './routes/authentication/googleRoutes'
import { errorHandler } from './routes/errorHandler'
import helmet from 'helmet'
import cors from 'cors'


dotenv.config()

const app = express()
app.use(helmet())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(session({secret: 'cats'}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use('/', router)
app.use('/auth', authRoutes)
app.use('/auth/google', googleRoute)
app.use(errorHandler)

app.get('/home', (req: Request, res: Response)=> {
    res.send('<a href="/auth/google">Authenticate with Google')
})


mongoose.connect(process.env.MONGO_URL as string)
.then(()=>{console.log('database connected')})
.catch(err => console.log('Connection error:', err))



const port = process.env.PORT



app.listen(port, ()  =>{
    console.log(`app is listening on port ${port}`);
})