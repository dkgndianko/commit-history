import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import AppApiDataResponse from '../response/AppApiDataResponse'
import GithubReposity from '../repository/GithubReposity'

export default class CommitController extends Controller {
  static async index (request: Request, response: Response, next: NextFunction) {
    GithubReposity.commits({repository: 'commit-history', owner: 'bcdbuddy'})
      .then(data => response.json(new AppApiDataResponse(data)))
      .catch(error => next(error))
  }
}