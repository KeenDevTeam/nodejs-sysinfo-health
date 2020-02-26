/**
 * Service health
 */

import CPU from "./CPU";
import Memory from "./Memory";
import OS from "./OS";
import Path from "./Path";
import UpTime from "./UpTime";
import User from "./User";

const factories: Record<string, (config: any) => any> = {

    CPU,
    Memory
};

export default factories;