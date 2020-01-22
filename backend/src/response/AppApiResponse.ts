export default class AppApiResponse {
  private type: string;
  private data: any;
  private message: string;
  public static readonly TYPE_SUCCESS = 'success';
  public static readonly TYPE_ERROR = 'error';

  /**
   *
   * @param {object|array} data
   * @param {string} type
   * @param {string} message
   */
  constructor (data: any, type: string, message: string) {
    this.data = data;
    this.type = type;
    this.message = message;
  }

  getData () {
    return this.data
  }

  getType () {
    return this.type
  }

  getMessage () {
    return this.message
  }

  toString () {
    return JSON.stringify({
      type: this.type,
      message: this.message,
      data: this.data
    })
  }

  isSuccess (): boolean {
    return this.type === AppApiResponse.TYPE_SUCCESS
  }

  static from (object: any): AppApiResponse {
    return new AppApiResponse(object.data, object.type, object.message)
  }
}
