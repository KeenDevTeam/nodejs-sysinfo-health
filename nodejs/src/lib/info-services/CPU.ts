/**
 * CPU information
 */

import OS from "os";

import IInfoService from "../interfaces/IInfoService";

class CPU implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "cpu";
    }

    async retrieve(): Promise<any> {

        return {
            usage: process.cpuUsage(),
            cores: OS.cpus()
        };
    }
}

export default (config: any): IInfoService => new CPU();