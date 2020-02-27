/**
 * InfoProvider
 */

import IInfoProvider from "../../src/lib/interfaces/IInfoProvider";
import IInfoService from "../../src/lib/interfaces/IInfoService";

class MockInfoProvider implements IInfoProvider {

    addProvider(provider: IInfoService): void { }

    async retrieve(providers: Array<string> | null | undefined): Promise<any> { return providers; }
}

export default MockInfoProvider;