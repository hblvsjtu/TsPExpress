import processQuery from '../utils/query';
import processBody from '../utils/body';

const preInterceptor: Interceptor<Next> = {
    resolve: async (next: Next) => {
        const req: Req = next.req;
        processQuery(req);
        await processBody(req);
        return next;
    },
    reject: (err?: Error) => {
        throw new Error('解析body出错！');
    }
};

export default preInterceptor;
