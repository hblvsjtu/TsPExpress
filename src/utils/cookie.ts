const processCookie = (req: any): void => {
    const cookieText: string = req.headers.cookie || '';
    req.cookie = cookieText.split('; ').reduce((t: any, i: string): any => {
        const [key, value] = i.split('=');
        if (key) {
            t[key] = value;
        }
        return t;
    }, {});
};

export default processCookie;
