/**
 * @file server入口
 * @author hblvsjtu(hblvsjtu@163.com)
 */

/// <reference path="../src/types/golbal.d.ts" />
const queryString = require('querystring');
import {BASE_DIR} from './common';
import pexpress from '../src/index';

const router: PExpress = pexpress.create();
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

router.use((next: Next) => {
    const {req, res} = next;
    if (req.url === '/*') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('path is *');
    }
    return next;
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
    res.end(
        'path is get/path, and routerQuery = ' +
            JSON.stringify(req.routeQuery) +
            JSON.stringify(req.query)
    );
    return next;
});

router.post('/post/:path', (next: Next) => {
    const {req, res} = next;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(
        'path is /put/path, and routerQuery = ' +
            JSON.stringify(req.routeQuery) +
            JSON.stringify(req.query) +
            JSON.stringify(req.body)
    );
    return next;
});

router.get('/*', (next: Next) => {
    const {req, res} = next;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(
        'path is not set, and routerQuery = ' +
            JSON.stringify(req.routeQuery) +
            JSON.stringify(req.query)
    );
    return next;
});

router.listen(3001, () => console.log('server start!'));
