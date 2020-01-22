import { Router } from "express";
import CommitController from '../controller/CommitController'

export default Router()
  .get('/', CommitController.index.bind(this))