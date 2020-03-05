/**
 * Service health
 */

import CPU from "./CPU";
import Memory from "./Memory";
import OS from "./OS";
import Path from "./Path";
import Uptime from "./Uptime";
import User from "./User";

import IInfoService from "../interfaces/IInfoService";

const factories: Record<string, (config: any | null | undefined) => IInfoService> = {

    CPU,
    Memory,
    OS,
    Path,
    Uptime,
    User
};

export default factories;