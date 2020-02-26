/**
 * Information provider interface
 */

import IInfoProviderService from "./IInfoService";

interface IInfoProvider {

    /**
     * Add a new provider
     */
    addProvider(provider: IInfoProviderService): void;

    /**
     * Retrieve information from the provider
     * @param providers List of providers you want to retrieve data from (leave null/undefined to retrieve data from all the available providers)
     */
    retrieve(providers: Array<string> | null): Promise<any>;
}

export default IInfoProvider;