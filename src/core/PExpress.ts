import commonMethod from './commonMethod';
import getStaticPathResolve from './staticPath';
import getExecutor from './executeChain';
import preInterceptor from './preInterceptor';
const http = require('http');

export default class PExpress {
    httpServer: any;
    interceptorList: Array<Interceptor<any>>;
    interceptManager: InterceptManager<any>;
    execute: ({req, res}: Next) => Next | Promise<Next>;
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
        this.interceptManager.use(preInterceptor);
        this.execute = getExecutor(this.interceptorList);
    }
    get(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return commonMethod(url, {resolve, reject}, this, 'GET');
    }
    post(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return commonMethod(url, {resolve, reject}, this, 'POST');
    }
    put(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return commonMethod(url, {resolve, reject}, this, 'PUT');
    }
    head(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return commonMethod(url, {resolve, reject}, this, 'HEAD');
    }
    options(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return commonMethod(url, {resolve, reject}, this, 'OPTIONS');
    }
    delete(url: string, resolve: ResolveFn<Next>, reject?: RejectFn): PExpress {
        return commonMethod(url, {resolve, reject}, this, 'DELETE');
    }
    setStaticPath(absolutePath: string, options?: StaticPathOptions): boolean {
        const fileInterceptor: Interceptor<Next> = {
            resolve: getStaticPathResolve(absolutePath, options),
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
