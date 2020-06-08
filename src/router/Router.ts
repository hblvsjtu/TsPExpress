export default class Router {
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
                promise = promise.then(resolve, reject).catch(reject);
            }
        }
        return promise;
    }
    get(url: string, routeInterceptor: RouteInterceptor): Router {
        routeInterceptor.method = 'get';
        routeInterceptor.url = url;
        this.interceptorList.push(routeInterceptor);
        return this;
    }
}
