# TsPExpress

使用 Typescript 和 Promise API 重构 Express

## 安装

```sh
npm install tspexpress
```

## 使用方法 开箱即用

```js
/// <reference path="../src/types/golbal.d.ts" />

import pexpress from 'tspexpress';

const router: PExpress = pexpress.create(); // 创建实例

router.use((next: Next) => {
    // logger拦截器
    const {req, res} = next;
    console.log(
        `\r\n\r\n==================   ${new Date().toISOString()}   ==================\r\n`
    );
    return next;
});

router.setStaticPath(BASE_DIR, {defaultFile: 'index.html'}); // 设置静态资源目录

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
    // 任意目录
    const {req, res} = next;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(
        'path is not set, and routerQuery = ' +
            JSON.stringify(req.routeQuery) +
            JSON.stringify(req.query)
    );
    return next;
});

router.listen(3000, () => console.log('server start!'));
```
