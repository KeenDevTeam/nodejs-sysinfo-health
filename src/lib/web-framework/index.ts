/**
 * Web framework entry point
 */

import { createEndpoint as createExpressEndpoint } from "./Express";
import { createEndpoint as createMicroEndpoint } from "./Micro";

export const Express = createExpressEndpoint;
export const Micro = createMicroEndpoint;