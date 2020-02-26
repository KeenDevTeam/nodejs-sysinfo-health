/**
 * Web framework entry point
 */

import { createEndpoint as createExpressEndpoint } from "./express";

export const Express = createExpressEndpoint;