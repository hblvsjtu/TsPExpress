/**
 * @file server入口
 * @author hblvsjtu(hblvsjtu@163.com)
 */

const http = require('http');
const queryString = require('querystring');
import buildStatisFiles from '../src/utils/staticPath';
import {BASE_DIR, DEFAULT_FILE} from './common';
import PExpress from '../src/core/PExpress';

const router: PExpress = new PExpress();
router.interceptManager.use({
    resolve: (next: Next) => {
        const {req, res} = next;
        console.log(
            `\r\n\r\n==================   ${new Date().toISOString()}   ==================\r\n`
        );
        return next;
    }
});

router.setStaticPath(BASE_DIR, {defaultFile: 'index.html'});

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
        if (req.url === '/put/path') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('path is /put/path');
        }
        return next;
    }
});

router.get('/get/:name', (next: Next) => {
    const {req, res} = next;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('path is get/path, and routerQuery = ' + JSON.stringify(req.routeQuery));
    return next;
});

router.post('/post/:path', (next: Next) => {
    const {req, res} = next;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('path is /put/path, and routerQuery = ' + JSON.stringify(req.routeQuery));
    return next;
});

const server = http.createServer((req: any, res: any): void => {
    router.execute({res, req});
});

server.listen('3001');
