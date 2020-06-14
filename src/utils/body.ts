import {CONTENT_TYPE} from '../utils/common';
const queryString = require('querystring');

const processBody = async (req: Req): Promise<Req> => {
    return new Promise((resolve, reject) => {
        try {
            const arr: Array<any> = [];
            req.on('data', (buff: Buffer): void => {
                arr.push(buff);
            });
            req.on('end', () => {
                const chunks: Buffer = Buffer.concat(arr);
                const contentType =
                    req.headers['content-type'] && req.headers['content-type'].split(';')[0];
                switch (contentType) {
                    case CONTENT_TYPE.row:
                        req.body = chunks.toString();
                        break;
                    case CONTENT_TYPE.x:
                        req.body = queryString.parse(chunks.toString());
                        break;
                    case CONTENT_TYPE.json:
                        req.body = JSON.parse(chunks.toString());
                        break;
                    case CONTENT_TYPE.formData:
                        // TODO
                        req.body = chunks.toString();
                        break;
                    default:
                        req.body = chunks.toString();
                }
                resolve(req);
            });
        } catch (err) {
            reject(err);
        }
    });
};

export default processBody;
