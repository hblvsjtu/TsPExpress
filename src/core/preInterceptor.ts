import processQuery from '../utils/query';
import processBody from '../utils/body';

const preInterceptor: Interceptor<Next> = {
    resolve: async (next: Next) => {
        const req: Req = next.req;
        try {
            processQuery(req);
            await processBody(req);
        } catch (err) {
            throw err;
        }
        return next;
    },
    reject: (err?: Error) => {
        throw err ? err : new Error('解析body出错！');
    }
};

export default preInterceptor;
