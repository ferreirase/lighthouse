import { Router } from 'express'
import userRoutes from './user.routes.js'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import { getAllUsers } from '../controllers/UserController.js'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'


const routes = Router()

routes.use('/users', userRoutes)

routes.post('/login', async (req, res) => {
  const users = await getAllUsers()

  const schema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  })

  if(!await schema.isValid(req.body)){
    return res.status(401).json({ error: true, message: 'Submit email and password' })
  }

  const [user] = users.filter((user) => String(user.email) === String(req.body.email))

  if(!user){
    return res.status(400).json({ error: true, message: 'User not found' })
  }

  if(!await bcrypt.compare(req.body.password, user.password)){
    return res.status(400).json({ error: true, message: 'Email/Password combination is wrong' })
  }

  return res.status(200).json({
    token: jwt.sign({
      data: `${user.id}`
    }, `${authConfig.jwt.secret}`, { expiresIn: authConfig.jwt.expiresIn })
  })

})

export default routes
