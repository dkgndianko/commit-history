import AppException from './AppException'

export default class NotFoundException extends AppException {
  constructor (message: string = 'Error 404. Not Found') {
    super(404, message)
  }
}