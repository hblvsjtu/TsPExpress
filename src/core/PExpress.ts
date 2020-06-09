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

const reject = (err: Error) => {
    console.error();
};

export default class PExpress {
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
                const {resolve, reject} = shift;
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
}
