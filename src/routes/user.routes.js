import { getAllUsers, createUser, updateUser } from '../controllers/UserController.js'
import { Router } from 'express'
import * as Yup from 'yup'
import authMiddleware from '../middlewares/ensureAuthenticated.js'

const userRoutes = Router()

userRoutes.get('/', authMiddleware, async (req, res) => {
  const users = getAllUsers()
  const limit = req.query.limit || 5
  const page = req.query.page || 1
  const startIndex = (page - 1) * limit 
  const endIndex = page * limit 

  if((users && users.length)) {
    return res.json(users.slice(startIndex, endIndex))
  }

  return res.json(users)
})

userRoutes.post('/', async (req, res) => {
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
  })

  if(!await schema.isValid(req.body)){
    return res.status(400).json({ error: true, message: 'Verify all fields before submit' })
  }

  if(!regexPass.test(req.body.password)){
    return res.status(400).json({ error: true, message: 'Password must have minimum eight characters, one uppercase letter, one lowercase letter and one number' })
  } 

  if(req.body.password !== req.body.confirmPassword){
    return res.status(400).json({ error: true, message: 'Password and confirm password are not equals' })
  }

  const newUser = await createUser(req.body)

  return res.json(newUser)
})

userRoutes.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params

  const userUpdated = await updateUser(id, req.body)

  return res.json(userUpdated)
})

export default userRoutes
