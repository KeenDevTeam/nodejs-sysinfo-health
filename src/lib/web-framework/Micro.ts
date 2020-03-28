/**
 * Micro integration
 */

import { send, createError, RequestHandler } from 'micro';
import IHealthService from '../interfaces/IHealthService';
import { IncomingMessage, ServerResponse } from 'http';

/**
 * Create health API endpoint for the express/express-compatible framework
 * @param healthService Instance of health service
 * @param services List of services you want to retrieve service
 */
export const createEndpoint = (healthService: IHealthService | null | undefined, services: Array<string> | null | undefined = null): RequestHandler => {

    if (!healthService) {
        throw new Error('healthService must be a valid instance of IHealthService');
    }

    return (req: IncomingMessage, res: ServerResponse) => {

        // Try to retrieve the status from the provider
        healthService.status(services)
            .then(status => send(res, 200, status))
            .catch((err: Error) => createError(500, err.message, err));
    };
};