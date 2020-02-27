/**
 * Info provider
 */

import { eachLimit as forEachParallel } from "async";

import IInfoProvider from "./interfaces/IInfoProvider";
import IInfoProviderConfig from "./interfaces/IInfoProviderConfig";
import IInfoService from "./interfaces/IInfoService";

import InfoProviders from "./info-services";

class InfoProvider implements IInfoProvider {

    private readonly config: IInfoProviderConfig;
    private readonly providers: Record<string, IInfoService> = {};

    constructor(config: IInfoProviderConfig) {

        this.config = config;

        if (config.loadDefaultProviders) {
            this.addAllDefaultProviders();
        }
    }

    /**
     * Add all default providers automatically
     */
    private addAllDefaultProviders() {

        if (!this.config.providerConfig) { return; }

        Object
            .keys(InfoProviders)
            .map(providerName => {

                // strict null-check
                let providerConfig = undefined;
                if (this.config.providerConfig) {
                    providerConfig = [providerName] || null;
                }

                this.addProvider(
                    InfoProviders[providerName](providerConfig)
                )
            });
    }

    /**
     * Add provider
     * @param provider Provider to add
     */
    addProvider(provider: IInfoService): void {

        if (this.providers[provider.name]) {
            throw new Error(`Provider ${provider.name} as already been registered.`);
        }

        // add provider
        this.providers[provider.name] = provider;
    }

    /**
     * Retrieve the health service of all the providers
     * @param providers List of providers you want to retrieve data from (leave null/undefined to retrieve data from all the available providers)
     */
    async retrieve(providers: Array<string> | null | undefined): Promise<any> {

        if (!providers || (Array.isArray(providers) && providers.length === 0)) {

            // add all services
            providers = Object.keys(this.providers);
        }

        const output: Record<string, any> = {};

        await forEachParallel(
            providers,
            providers.length,
            async (providerName) => {

                const provider = this.providers[providerName];
                const result = await provider.retrieve();

                if (result) {
                    output[provider.name] = result;
                }
            }
        );

        return output;
    }
}

export default InfoProvider;