/**
 * Memory information
 */

import os from "os";

import IInfoService from "../interfaces/IInfoService";

class Memory implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "memory";
    }

    async retrieve(): Promise<any> {

        return {
            usage: process.memoryUsage(),
            total: os.totalmem(),
            free: os.freemem()
        };
    }
}

export default (config: any): IInfoService => new Memory();