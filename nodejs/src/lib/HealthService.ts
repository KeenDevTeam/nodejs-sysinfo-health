/**
 * Health service
 */

import IHealthServiceConfig from "./interfaces/IHealthServiceConfig";
import IInfoProvider from "./interfaces/IInfoProvider";
import IHealthService from "./interfaces/IHealthService";

class HealthService implements IHealthService {

    private readonly config: IHealthServiceConfig | null | undefined;
    private readonly infoProvider: IInfoProvider;

    constructor(config: IHealthServiceConfig | null | undefined, infoProvider: IInfoProvider) {

        this.config = config;
        this.infoProvider = infoProvider;
    }

    /**
     * Get current health status of the service
     */
    async status(providers: Array<string> | null | undefined): Promise<any> {

        return await this.infoProvider.retrieve(providers);
    }
}

export default HealthService;