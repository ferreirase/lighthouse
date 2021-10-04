import User from '../models/User.js'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import AppError from '../errors/AppError.js'

const __dirname = path.resolve()
const filePath = path.join(__dirname, '/src', '/database', 'db.json')

export const getAllUsers = () => {
  try {
    const users = fs.readFileSync(filePath)

    if (users.length === 0) return []

    return JSON.parse(users)
  } catch (error) {
    throw new AppError({ message: `${error.message}`, statusCode: 400 })
  }
}

export const createUser = async ({ name, phone, email, password }) => {
  const newUser = new User({ id: v4(), name, phone, email, password })

  newUser.password = await bcrypt.hash(password, 10)

  const users = getAllUsers()

  const [userEmailExists] = users.filter((user) => String(user.email) === String(email))

  if(userEmailExists){
    throw new AppError({ message: 'User email already exists', statusCode: 400 })
  }

  try {
    if(!users.length) {

      fs.writeFileSync(filePath, JSON.stringify([newUser]))

      return getAllUsers()
    }

    fs.writeFileSync(filePath, JSON.stringify([...users, newUser]))

    return getAllUsers()

  } catch (error) {
    throw new AppError({ message: `${error.message}`, statusCode: 400 })
  }
}

export const updateUser = async (id, body) => {
  const users = await getAllUsers()

  const [userExists] = users.filter((user) => String(user.id) === String(id))
  const userEmailExists = users.filter((user) => String(user.email) === String(body.email))

  if(!userExists){
    throw new AppError({ message: 'User not found', statusCode: 400 })
  }

  if(userEmailExists.length > 1){
    throw new AppError({ message: 'User email already exists', statusCode: 400 })
  }

  userExists.name = body.name ?? userExists.name
  userExists.phone = body.phone ?? userExists.phone
  userExists.email = body.email ?? userExists.email
  userExists.password = body.password ? await bcrypt.hash(body.password, 10) : userExists.password

  const newUsersArray = users.filter((user) => String(user.id) !== String(id))

  fs.writeFileSync(filePath, JSON.stringify([...newUsersArray, userExists]))

  return users.filter((user) => String(user.id) === String(id))
}
