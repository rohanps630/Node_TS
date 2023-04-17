interface IResponseFormat {
  data?: any;
  message?: string;
  status?: number;
  timestamp?: string;
}

class ResponseFormat implements IResponseFormat {
  constructor(
    public data: any,
    public message: string,
    public status: number = 200,
    public timestamp: string = new Date().toISOString()
  ) {}
}

class ErrorFormat implements IResponseFormat {
  constructor(
    public error: any,
    public message: string,
    public status: number = 500,
    public timestamp: string = new Date().toISOString()
  ) {}
}

class ResponseFactory {
  static format(data: any, message: string, status: number = 200): IResponseFormat {
    return new ResponseFormat(data, message, status);
  }

  static formatError(error: any, message: string, status: number = 500): IResponseFormat {
    return new ErrorFormat(error, message, status);
  }
}

export { ResponseFactory, IResponseFormat };
