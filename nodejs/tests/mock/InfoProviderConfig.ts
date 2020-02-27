/**
 * Mock InfoProviderConfig
 */

export class InfoProviderConfigEmpty {

    readonly loadDefaultProviders: boolean = false;

    readonly providerConfig: Record<string, any> = {};
}

export class InfoProviderConfigLoadDefaultProviders {

    readonly loadDefaultProviders: boolean = true;

    readonly providerConfig: Record<string, any> = [{}];
}