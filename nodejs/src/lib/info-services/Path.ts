/**
 * Path information
 */

import IInfoService from "../interfaces/IInfoService";

class Path implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "path";
    }

    async retrieve(): Promise<any> {

        return {
            cwd: process.cwd()
        };
    }
}

export default (config: any): IInfoService => new Path();