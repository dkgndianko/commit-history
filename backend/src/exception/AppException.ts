export default class AppException extends Error {
  protected status: number;

  constructor (status, message) {
    super(message)
    this.status = status
  }
}