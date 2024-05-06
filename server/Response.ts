export class ResponseModel {
  private token?: string;
  private data?: any[];
  private errorMessage?: any[]

  constructor() {}

  setToken(token: string) {
    this.token = token;
    return this;
  }

  setData(data: any) {
    this.data = data;
    return this;
  }

  setErrorMessage(errorMessage: any) {
    this.errorMessage?.push(errorMessage);
    return this;
  }

  get() {
    if(this.errorMessage) {
      return {
        errors: {
          body: this.errorMessage
        }
      }
    }else {
      return JSON.stringify(this.data)
    }
  }
}