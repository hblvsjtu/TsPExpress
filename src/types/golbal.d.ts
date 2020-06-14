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

interface MyHeaders {
    [name: string]: any;
}

interface MyQuery {
    [other: string]: any;
}

interface Req {
    _readableState?: any;
    readable?: any;
    _events?: any;
    _eventsCount?: any;
    _maxListeners?: any;
    accepts?: any;
    cookies?: any;
    socket?: any;
    connection?: any;
    httpVersionMajor?: any;
    httpVersionMinor?: any;
    httpVersion?: any;
    complete?: any;
    headers?: any;
    rawHeaders?: any;
    trailers?: any;
    rawTrailers?: any;
    upgrade?: any;
    url?: any;
    method?: any;
    statusCode?: any;
    statusMessage?: any;
    client?: any;
    _consuming?: any;
    _dumped?: any;
    routeQuery?: any;
    abort?: () => any;
    aborted?: boolean;
    end?: (chunk: string | Buffer, encoding?: string, callback?: Function) => any;
    destroy?: (error?: Error) => Req;
    destroyed?: boolean;
    finished?: boolean;
    getHeader?: (name: string) => any;
    maxHeadersCount?: number;
    path?: string;
    removeHeader?: (name: string) => any;
    reusedSocket?: boolean;
    setHeader?: (name: string, value?: any) => any;
    setNoDelay?: (noDelay: boolean) => any;
    setSocketKeepAlive?: (enable: boolean, initialDelay?: boolean) => any;
    setTimeout?: (timeout: number, callback?: Function) => any;
    writableEnded?: boolean;
    writableFinished?: boolean;
    write?: (chunk: string | Buffer, encoding?: string, callback?: Function) => any;
    [other: string]: any;
    query?: MyQuery;
    body?: any;
}

interface Res {
    _events?: any;
    _eventsCount?: any;
    _maxListeners?: any;
    output?: any;
    outputEncodings?: any;
    outputCallbacks?: any;
    outputSize?: any;
    writable?: any;
    _last?: any;
    chunkedEncoding?: any;
    shouldKeepAlive?: any;
    useChunkedEncodingByDefault?: any;
    _removedConnection?: any;
    _removedContLen?: any;
    _removedTE?: any;
    _contentLength?: any;
    _hasBody?: any;
    _trailer?: any;
    _headerSent?: any;
    socket?: any;
    connection?: any;
    _header?: any;
    _onPendingData?: any;
    _sent100?: any;
    _expect_continue?: any;
    addTrailers: (Headers: boolean) => any;
    end: (chunk: string | Buffer, encoding?: string, callback?: Function) => any;
    abort: () => any;
    aborted?: boolean;
    destroy: (error?: Error) => Req;
    destroyed?: boolean;
    finished?: boolean;
    getHeader: (name: string) => any;
    hasHeader: (name: string) => boolean;
    removeHeader: (name: string) => any;
    getHeaderNames: () => Array<string>;
    getHeaders: () => Array<Object>;
    sendDate?: boolean;
    setHeader: (name: string, value?: any) => any;
    setTimeout: (timeout: number, callback?: Function) => any;
    statusCode?: number;
    statusMessage?: string;
    write: (chunk: string | Buffer, encoding?: string, callback?: Function) => any;
    writeHead: (statusCode: number, headers?: MyHeaders) => any;
    [other: string]: any;
}

interface MyContentType {
    x: string;
    row: string;
    formData: string;
    json: string;
}

interface Next {
    req: Req;
    res: Res;
}

type ResolveFn<T> = (data: T) => T | Promise<T>;

type RejectFn = (data: Error | undefined) => any;

interface Interceptor<T> {
    resolve: ResolveFn<T>;
    reject?: RejectFn;
}

interface InterceptManager<T> {
    use: (interceptor: Interceptor<T>) => number;
    eject: (index: number) => void;
}

type StaticPathResolve = (absolutePath: string, options?: StaticPathOptions) => ResolveFn<Next>;
type Executor = (next: Next) => Next | Promise<Next>;
type GetExecutor = (interceptorList: Array<Interceptor<any>>) => Executor;

interface PExpress {
    httpServer: any;
    interceptorList: Array<Interceptor<any>>;
    interceptManager: InterceptManager<any>;
    execute: Executor;
    use: (resolve: ResolveFn<Next>) => PExpress;
    get: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    post: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    put: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    head: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    options: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    delete: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    setStaticPath: (absolutePath: string, options?: StaticPathOptions) => boolean;
    create: () => PExpress;
    listen: (port: number, callback?: () => any) => any;
}

interface StaticPathOptions {
    defaultFile?: string;
}
