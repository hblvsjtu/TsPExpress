const defaultReject = (err: Error) => {
    throw err;
};

const getExecutor: GetExecutor = function(interceptorList: Array<Interceptor<Next>>): Executor {
    return function({req, res}: Next): Next | Promise<Next> {
        const promiseChain: Array<Interceptor<Next>> = interceptorList.map(i => i);
        let promise: any = Promise.resolve({req, res});
        while (promiseChain.length) {
            const shift = promiseChain.shift();
            if (shift && promise instanceof Promise) {
                const {resolve, reject = defaultReject} = shift;
                promise = promise.then(resolve, reject);
            }
        }
        return promise;
    };
};

export default getExecutor;
