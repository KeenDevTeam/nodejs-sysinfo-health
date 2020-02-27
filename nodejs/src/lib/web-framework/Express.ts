/**
 * Express integration
 */

import { Request as expressRequest, Response as expressResponse, Handler as expressHandler } from 'express';
import IHealthService from '../interfaces/IHealthService';

/**
 * Create health API endpoint for the express/express-compatible framework
 * @param healthService Instance of health service
 * @param services List of services you want to retrieve service
 */
export const createEndpoint = (healthService: IHealthService, services: Array<string> | null | undefined = null): expressHandler => {

    if (!healthService) {
        throw new Error('healthService must be a valid instance of IHealthService');
    }

    return (req: expressRequest, res: expressResponse, next: (err: Error) => void) => {

        // Try to retrieve the status from the provider
        healthService.status(services)
            .then(status => res.status(200).send(status))
            .catch(next);
    };
};