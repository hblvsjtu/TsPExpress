const commonMethod = (
    url: string,
    routeInterceptor: Interceptor<Next>,
    content: PExpress,
    methodType: string
): PExpress => {
    const originResolve = routeInterceptor.resolve;
    routeInterceptor.resolve = (next: Next): Next | Promise<Next> => {
        if (next.res.stop) return next;
        if (url === '/*') {
            return originResolve(next);
        }
        const {req, res} = next;
        const noQueryUrl = req.url.replace(/\?.+$/, '');
        const [preUrl, routeQueryKey] = url.split(':');
        if (req.method !== methodType || req.url.indexOf(preUrl) !== 0) return next;
        else {
            req.routeQuery = {
                [routeQueryKey]: noQueryUrl.replace(new RegExp(preUrl), '')
            };
            return originResolve(next);
        }
    };
    content.interceptorList.push(routeInterceptor);
    return content;
};

export default commonMethod;
