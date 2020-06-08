type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH';

interface StaticFilesOptions {
    res: any;
    path: string;
    contentType?: string;
    responseCode?: number;
}

interface StaticFilesOptions {
    res: any;
    path: string;
    contentType?: string;
    responseCode?: number;
}

interface FileData {
    next: string;
    message: string;
}

interface Next {
    req: any;
    res: any;
}

type ResolveFn<T> = (data: T) => Next | FileData | Promise<FileData | Next>;

type RejectFn = (data: Error | undefined) => any;

interface Interceptor<T> {
    resolve: ResolveFn<T>;
    reject?: RejectFn;
}

interface RouteInterceptor extends Interceptor<Next> {
    url: string;
    method: Method;
}

interface InterceptManager<T> {
    use: (interceptor: Interceptor<T>) => number;
    eject: (index: number) => void;
}

interface Router {
    interceptorList: Array<Interceptor<any>>;
    interceptManager: InterceptManager<any>;
    execute: (next: Next) => Next | Promise<Next>;
    get: (url: string, interceptor: Interceptor<Next>) => Router;
    post: (url: string, interceptor: Interceptor<Next>) => Router;
}
