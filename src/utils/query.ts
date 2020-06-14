const queryString = require('querystring');

const processQuery = (req: any): void => {
    const [path, query] = req.url.split('?');
    req.query = queryString.parse(query);
};

export default processQuery;
