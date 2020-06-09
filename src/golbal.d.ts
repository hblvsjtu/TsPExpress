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
    aborted?: any;
    upgrade?: any;
    url?: any;
    method?: any;
    statusCode?: any;
    statusMessage?: any;
    client?: any;
    _consuming?: any;
    _dumped?: any;
    routeQuery?: any;
    [other: string]: any;
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
    sendDate?: any;
    _removedConnection?: any;
    _removedContLen?: any;
    _removedTE?: any;
    _contentLength?: any;
    _hasBody?: any;
    _trailer?: any;
    finished?: any;
    _headerSent?: any;
    socket?: any;
    connection?: any;
    _header?: any;
    _onPendingData?: any;
    _sent100?: any;
    _expect_continue?: any;
    [other: string]: any;
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

interface PExpress {
    interceptorList: Array<Interceptor<any>>;
    interceptManager: InterceptManager<any>;
    execute: (next: Next) => Next | Promise<Next>;
    get: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    post: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    put: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    head: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    options: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
    delete: (url: string, resolve: ResolveFn<Next>, reject?: RejectFn) => PExpress;
}
