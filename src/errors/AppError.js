export default class Error {
  constructor ({ message, statusCode }) {
    this.message = message
    this.statusCode = statusCode
  }
}
