/**
 * OS information
 */

import os from "os";

import IInfoService from "../interfaces/IInfoService";

class OS implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "os";
    }

    async retrieve(): Promise<any> {

        return {
            platform: os.platform(),
            release: os.release(),
            type: os.type(),
            hostname: os.hostname()
        };
    }
}

export default (config: any): IInfoService => new OS();