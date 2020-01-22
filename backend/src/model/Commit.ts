export default class Commit {
  private id: string;
  private message: string;
  private verified: boolean;
  private parents: {sha: string, url: string}[];
  private authorAvatar: string;
  private authorName: string
  private authorEmail: string;
  private at: string;
  
  constructor (payload) {
    this.id = payload.sha
    this.message = payload.commit.message
    this.verified = payload.commit.verification.verified
    this.parents = payload.parents
    this.authorAvatar = payload.author.avatar_url
    this.authorName = payload.commit.author.name
    this.authorEmail = payload.commit.author.email
    this.at = payload.commit.author.date
  }


}