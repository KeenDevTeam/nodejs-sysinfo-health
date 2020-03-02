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
    private readonly _providers: Record<string, IInfoService> = {};

    constructor(config: IInfoProviderConfig | null | undefined) {

        if (!config) {
            throw new Error('config cannot be null or undefined');
        }

        this.config = config;

        if (config.loadDefaultProviders) {
            this.addAllDefaultProviders();
        }
    }

    /**
     * Add all default providers automatically
     */
    private addAllDefaultProviders() {

        Object
            .keys(InfoProviders)
            .map(providerName => {

                // strict null-check
                let providerConfig = undefined;
                if (this.config.providerConfig) {
                    providerConfig = [providerName] || undefined;
                }

                // add to the providers list
                this.addProvider(InfoProviders[providerName](providerConfig));
            });
    }

    /**
     * Get list of registered providers
     */
    get providers(): Record<string, IInfoService> {
        return this._providers;
    }

    /**
     * Add provider
     * @param provider Provider to add
     */
    addProvider(provider: IInfoService): void {

        if (this._providers[provider.name]) {
            throw new Error(`Provider ${provider.name} as already been registered.`);
        }

        // add provider
        this._providers[provider.name] = provider;
    }

    /**
     * Retrieve the health service of all the providers
     * @param providers List of providers you want to retrieve data from (leave null/undefined to retrieve data from all the available providers)
     */
    async retrieve(providers: Array<string> | null | undefined): Promise<any> {

        if (!providers || (Array.isArray(providers) && providers.length === 0)) {

            // add all services
            providers = Object.keys(this._providers);
        }

        const output: Record<string, any> = {};
        const concurrencyLevel = providers.length < 1 ? 1 : providers.length;

        await forEachParallel(
            providers,
            concurrencyLevel,
            (providerName, cb) => {

                try {

                    const provider = this._providers[providerName];
                    provider.retrieve()
                        .then(result => {

                            output[provider.name] = result;
                            return cb();
                        })
                        .catch(err => {
                            throw err;
                        });
                }
                catch (err) {
                    return cb(err);
                }
            }
        );

        return output;
    }
}

export default InfoProvider;