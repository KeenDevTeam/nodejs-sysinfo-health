/**
 * Mock health service
 */

import IHealthService from "../../src/lib/interfaces/IHealthService";

class MockHealthService implements IHealthService {

    /**
     * Get current health status of the service
     */
    async status(providers: Array<string> | null | undefined): Promise<any> {

        return providers;
    }
}

export default MockHealthService;