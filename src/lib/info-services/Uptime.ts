/**
 * Uptime information
 */

import os from "os";

import IInfoService from "../interfaces/IInfoService";

class Uptime implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "uptime";
    }

    async retrieve(): Promise<any> {

        return {
            process: {
                uptime: process.uptime(),
                hrtime: process.hrtime(),
            },

            os: {
                uptime: os.uptime()
            }
        };
    }
}

export default (config: any): IInfoService => new Uptime();