/**
 * Information provider config
 */

type IInfoProviderConfig = {

    /**
     * Load default providers
     */
    readonly loadDefaultProviders: boolean;

    /**
     * Key/value pair of configuration
     */
    readonly providerConfig: Record<string, any>;
};

export default IInfoProviderConfig;