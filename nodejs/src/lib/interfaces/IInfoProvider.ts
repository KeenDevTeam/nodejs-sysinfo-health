/**
 * Information provider interface
 */

import IInfoService from "./IInfoService";

interface IInfoProvider {

    /**
     * Add a new provider
     */
    addProvider(provider: IInfoService): void;

    /**
     * Retrieve information from the provider
     * @param providers List of providers you want to retrieve data from (leave null/undefined to retrieve data from all the available providers)
     */
    retrieve(providers: Array<string> | null | undefined): Promise<any>;
}

export default IInfoProvider;