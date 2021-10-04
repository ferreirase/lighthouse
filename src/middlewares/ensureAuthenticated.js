import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'
import AppError from '../errors/AppError.js'

const { verify } = jwt

export default function ensureAuthenticated (
  request,
  _,
  next
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError({
      message: 'JWT token is missing',
      statusCode: 400
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret)

    const { sub } = decodedToken

    request.user = {
      id: sub
    }

    return next()
  } catch (error) {
    throw new AppError({
      message: 'JWT token invalid',
      statusCode: 400
    })
  }
}
