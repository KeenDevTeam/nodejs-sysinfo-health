/**
 * Service health
 */

import CPU from "./CPU";
import Memory from "./Memory";
import OS from "./OS";
import Path from "./Path";
import Uptime from "./Uptime";
import User from "./User";

const factories: Record<string, (config: any) => any> = {

    CPU,
    Memory,
    OS,
    Path,
    Uptime,
    User
};

export default factories;