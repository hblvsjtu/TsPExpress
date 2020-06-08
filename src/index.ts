/**
 * @file server入口
 * @author hblvsjtu(hblvsjtu@163.com)
 */

const http = require('http');
const queryString = require('querystring');
import buildStatisFiles from '../src/utils/staticPath';
import {BASE_DIR, DEFAULT_FILE} from './utils/common';
import Router from './router/Router';

const router: Router = new Router();
router.interceptManager.use({
    resolve: (next: Next) => {
        const {req, res} = next;
        console.log(`==================   ${new Date().toISOString()}   ==================`);
        return next;
    }
});
router.interceptManager.use({
    resolve: (next: Next) => {
        const {req, res} = next;
        const {url, method, headers, accepts} = req;
        const [relativePath, queryObject] = url.split('?');
        const query = queryString.parse(queryObject);
        console.log({
            url,
            query,
            method,
            headers,
            accepts
        });
        return next;
    }
});

router.interceptManager.use({
    resolve: (next: Next) => {
        const {req, res} = next;
        if (req.url === '/get/path') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('path is /get/path');
        }
        return next;
    }
});

router.interceptManager.use({
    resolve: (next: Next) => {
        const {req, res} = next;
        if (req.url === '/post/path') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('path is /post/path');
        }
        return next;
    }
});

const server = http.createServer((req: any, res: any): void => {
    const [relativePath, queryObject] = req.url.split('?');
    const isFile = relativePath.includes('.');
    if (req.url === '/') {
        buildStatisFiles({
            res,
            path: BASE_DIR + '/' + DEFAULT_FILE,
            contentType: 'text/' + DEFAULT_FILE.split('.')[1]
        });
    } else if (isFile) {
        const ext = relativePath.split('.').reverse()[0];
        buildStatisFiles({
            res,
            path: BASE_DIR + relativePath,
            contentType: 'text/' + ext
        });
    } else {
        router.execute({res, req});
    }
});

server.listen('3001');
