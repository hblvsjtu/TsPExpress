import buildStatisFiles from '../utils/staticPath';
const path = require('path');
const http = require('http');

const methodProxy = (
    url: string,
    routeInterceptor: Interceptor<Next>,
    content: PExpress,
    methodType: string
): PExpress => {
    const originResolve = routeInterceptor.resolve;
    routeInterceptor.resolve = (next: Next): Next | Promise<Next> => {
        const {req, res} = next;
        const [preUrl, routeQueryKey] = url.split(':');
        if (req.method !== methodType || req.url.indexOf(preUrl) !== 0) return next;
        else {
            req.routeQuery = {
                [routeQueryKey]: req.url.replace(new RegExp(preUrl), '')
            };
            return originResolve(next);
        }
    };
    content.interceptorList.push(routeInterceptor);
    return content;
};

const defaultReject = (err: Error) => {
    console.error(err);
};

export default class PExpress {
    httpServer: any;
    interceptorList: Array<Interceptor<any>>;
    interceptManager: InterceptManager<any>;
    constructor() {
        this.interceptorList = [];
        this.interceptManager = {
            use: (interceptor: Interceptor<any>): number => {
                this.interceptorList.push(interceptor);
                return this.interceptorList.length - 1;
            },
            eject: (index: number) => {
                this.interceptorList.splice(index, 1);
            }
        };
    }
    execute({req, res}: Next): Next | Promise<Next> {
        const promiseChain: Array<Interceptor<any>> = this.interceptorList.map(i => i);
        let promise = Promise.resolve({req, res});
        while (promiseChain.length) {
            const shift = promiseChain.shift();
            if (shift && promise instanceof Promise) {
                const {resolve, reject = defaultReject} = shift;
                promise = promise.then(resolve, reject);
            }
        }
        return promise;
    }
    get(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return methodProxy(url, {resolve, reject}, this, 'GET');
    }
    post(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return methodProxy(url, {resolve, reject}, this, 'POST');
    }
    put(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return methodProxy(url, {resolve, reject}, this, 'PUT');
    }
    head(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return methodProxy(url, {resolve, reject}, this, 'HEAD');
    }
    options(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return methodProxy(url, {resolve, reject}, this, 'OPTIONS');
    }
    delete(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return methodProxy(url, {resolve, reject}, this, 'DELETE');
    }
    setStaticPath(absolutePath: string, options?: StaticPathOptions): boolean {
        const fileInterceptor: Interceptor<Next> = {
            resolve: (next: Next): Next | Promise<Next> => {
                const {req, res} = next;
                const [relativePath, queryObject] = req.url.split('?');
                const isFile = relativePath.includes('.');
                if (req.url === '/') {
                    if (options) {
                        const defaultFile = options.defaultFile;
                        defaultFile &&
                            buildStatisFiles({
                                res,
                                path: path.join(absolutePath, defaultFile),
                                contentType: 'text/' + defaultFile.split('.')[1]
                            });
                    }
                } else if (isFile) {
                    const ext = relativePath.split('.').reverse()[0];
                    buildStatisFiles({
                        res,
                        path: path.join(absolutePath, relativePath),
                        contentType: 'text/' + ext
                    });
                }
                return next;
            },
            reject: (err?: Error): void => {
                if (err) {
                    console.error(err.message);
                    throw err;
                }
            }
        };
        this.interceptorList.push(fileInterceptor);
        return true;
    }
    create() {
        this.httpServer = http.createServer((req: any, res: any) => {
            this.execute({req, res});
        });
        return this;
    }
    listen(port: number, callback?: () => any) {
        return this.httpServer.listen(port, callback);
    }
}
