import axios, { AxiosResponse } from 'axios'
import Commit from '../model/Commit'
export interface RepoParam {
  owner: string
  repository: string
}

export default class GithubReposity {
  /**
   * 
   * @param {object} data 
   * @param {string} [data.sha='master'] SHA or branch to start listing commits from. Default: the repository’s default branch
   * @param {string} [data.path] Only commits containing this file path will be returned.
   * @param {string} [data.author] GitHub login or email address by which to filter by commit author.
   * @param {string} [data.since] Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   * @param {string} [data.until] Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  static commits(data) {
    return new Promise((resolve, reject) => {
      const { owner, repository } = data
      axios({
        url: `https://api.github.com/repos/${owner}/${repository}/commits`,
        method: 'GET',
        headers: {
          // 'content-type': ''
          // 'User-Agent': ''
        }
      })
        .then((response: AxiosResponse) => {
          resolve(response.data.map(commit => new Commit(commit)))
        })
        .catch((error: Error) => reject(error))
    })
  }

  static commit(data) {
    return new Promise((resolve, reject) => {
      const { owner, repository, sha } = data
      axios({
        url: `https://api.github.com/repos/${owner}/${repository}/commits/${sha}`,
        method: 'GET',
        headers: {
          // 'content-type': ''
          // 'User-Agent': ''
        }
      })
        // Commit with addiontional keys: stats, files
        .then((response: AxiosResponse) => resolve(response.data))
        .catch((error: Error) => reject(error))
    })
  }
}
