/**
 * Memory information
 */

import OS from "os";

import IInfoService from "../interfaces/IInfoService";

class Memory implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "memory";
    }

    async retrieve(): Promise<any> {

        return {
            usage: process.memoryUsage(),
            total: OS.totalmem(),
            free: OS.freemem()
        };
    }
}

export default (config: any): IInfoService => new Memory();