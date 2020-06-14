import buildStatisFiles from '../utils/staticPath';
const path = require('path');

const getStaticPathResolve: StaticPathResolve = function(
    absolutePath: string,
    options?: StaticPathOptions
) {
    return (next: Next): Next | Promise<Next> => {
        const {req, res} = next;
        const [relativePath, queryObject] = req.url.split('?');
        const isFile = relativePath.includes('.');
        if (relativePath === '/') {
            if (options) {
                const defaultFile = options.defaultFile;
                defaultFile &&
                    buildStatisFiles({
                        res,
                        path: path.join(absolutePath, defaultFile),
                        contentType: 'text/' + defaultFile.split('.')[1]
                    });
            }
        } else if (isFile) {
            const ext = relativePath.split('.').reverse()[0];
            buildStatisFiles({
                res,
                path: path.join(absolutePath, relativePath),
                contentType: 'text/' + ext
            });
        }
        return next;
    };
};

export default getStaticPathResolve;
