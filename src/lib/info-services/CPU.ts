/**
 * CPU information
 */

import os from "os";

import IInfoService from "../interfaces/IInfoService";

class CPU implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "CPU";
    }

    async retrieve(): Promise<any> {

        return {
            usage: process.cpuUsage(),
            cores: os.cpus()
        };
    }
}

export default (config: any): IInfoService => new CPU();