const fs = require('fs');

const buildStatisFiles = function({
    res,
    path,
    contentType = 'text/html',
    responseCode = 200
}: StaticFilesOptions): void {
    res.stop = true;
    fs.readFile(path, (err: Error, data: any): void => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
};

export default buildStatisFiles;
