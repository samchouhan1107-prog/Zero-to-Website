declare module 'express' {
  function express(): express.Application;
  namespace express {
    interface Application {
      use(...args: any[]): Application;
      get(path: string, ...handlers: Function[]): Application;
      post(path: string, ...handlers: Function[]): Application;
      put(path: string, ...handlers: Function[]): Application;
      delete(path: string, ...handlers: Function[]): Application;
      listen(port: number, callback?: Function): void;
    }
    
    interface Request {
      body: any;
      params: any;
      query: any;
      headers: any;
    }
    
    interface Response {
      json(data: any): Response;
      status(code: number): Response;
      send(data: any): Response;
    }
  }
  export = express;
}