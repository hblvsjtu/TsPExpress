const fs = require('fs');
const path = require('path');

type ResolveFn<T> = (data: T) => FileData | Promise<FileData> | void;

type RejectFn = (data: Error | undefined) => any;

interface FileData {
    next: string;
    message: string;
}

const fileReadPromise = function<T extends Object>(absolutePath: string): Promise<T> {
    return new Promise((resolve: ResolveFn<T>, reject?: RejectFn): void => {
        fs.readFile(absolutePath, (err: Error | undefined, data: T) => {
            if (err && reject) {
                reject(err);
            }
            resolve(JSON.parse(data.toString()));
        });
    });
};

export const readFile = async (
    filePath: string,
    callback: (data: Array<FileData>) => any,
    tableNum: number = 1
) => {
    const result: Array<FileData> = [];
    const resolveFn = (data: FileData): FileData | Promise<FileData> | void => {
        result.push(data);
        if (data.next) {
            const absolutePath = path.join(filePath, '../', data.next);
            return fileReadPromise(absolutePath);
        } else callback(result);
    };
    const resolveChain: Array<ResolveFn<FileData>> = Array(tableNum)
        .fill(0)
        .map(i => resolveFn);
    let promise: Promise<FileData> | any = fileReadPromise(filePath);
    while (resolveChain.length) {
        const resolve = resolveChain.pop();
        promise = promise.then(resolve);
    }
    return promise;
};
