/**
 * User information
 */

import os from "os";

import IInfoService from "../interfaces/IInfoService";

class User implements IInfoService {

    readonly name: string;

    constructor() {
        this.name = "user";
    }

    async retrieve(): Promise<any> {

        return {
            ...os.userInfo()
        };
    }
}

export default (config: any): IInfoService => new User();