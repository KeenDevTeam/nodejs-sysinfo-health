/**
 * InfoProvider
 */

import { expect } from 'chai';
import { createCheckers } from 'ts-interface-checker';

import InfoProvider from '../src/lib/InfoProvider';
import CPUInfoProvider from '../src/lib/info-services/CPU';

import IInfoProviderTI from './interfaces/IInfoProvider-ti';

const runTests = () => {

    it('should implement IInfoProvider', () => {

        // class constructor
        expect(InfoProvider).to.be.a('function');

        // type check
        const instance = new InfoProvider({
            loadDefaultProviders: true,
            providerConfig: undefined
        });

        // interface check
        const { IInfoProvider: IInfoProviderTypeChecker } = createCheckers(IInfoProviderTI);
        IInfoProviderTypeChecker.check(instance);
    });

    it('should throw error if config is null', () => {

        expect(() => new InfoProvider(null)).to.throw('config cannot be null or undefined');
    });

    it('should throw error if config is undefined', () => {

        expect(() => new InfoProvider(undefined)).to.throw('config cannot be null or undefined');
    });

    it('should return no provider', async () => {

        const instance = new InfoProvider({ loadDefaultProviders: false, providerConfig: undefined });

        expect(Object.keys(instance.providers)).to.has.lengthOf(0);
    });

    it('should return an empty object', async () => {

        const instance = new InfoProvider({ loadDefaultProviders: false, providerConfig: undefined });

        const result = await instance.retrieve(undefined);

        expect(result).to.be.an('object');
        expect(Object.keys(result)).to.has.lengthOf(0);
    });

    it('should pass provider config for all the built-in providers', async () => {

        const instance = new InfoProvider({
            loadDefaultProviders: true,
            providerConfig: {
                CPU: {},
                Memory: {},
                OS: {},
                Path: {},
                Uptime: {},
                User: {},
            }
        });

        expect(Object.keys(instance.providers)).to.have.lengthOf(6);
    });

    it('should throw error in case of duplicated provider', () => {

        const instance = new InfoProvider({
            loadDefaultProviders: true,
            providerConfig: undefined
        });

        expect(() => instance.addProvider(CPUInfoProvider(undefined))).throws(`Provider cpu as already been registered.`);
    });

    it('should return all the providers info', async () => {

        const instance = new InfoProvider({
            loadDefaultProviders: true,
            providerConfig: undefined
        });

        const result = await instance.retrieve(undefined);

        expect(Object.keys(result)).to.has.lengthOf(Object.keys(instance.providers).length);
    }).timeout('5s');

    it('should return CPU info only', async () => {

        const instance = new InfoProvider({
            loadDefaultProviders: true,
            providerConfig: undefined
        });

        const result = await instance.retrieve(['cpu']);

        expect(Object.keys(result)).to.has.lengthOf(1);
        expect(result.cpu).to.be.an('object');
    }).timeout('5s');

    // it('should throw error if infoProvider is null', () => {

    //     expect(() => new HealthService({}, null)).to.throw('infoProvider cannot be null or undefined');
    // });

    // it('should throw error if infoProvider is undefined', () => {

    //     expect(() => new HealthService({}, undefined)).to.throw('infoProvider cannot be null or undefined');
    // });

    // it('should return exact value', async function () {

    //     // type check
    //     const instance = new HealthService({}, new MockInfoProvider());

    //     let result = await instance.status(null);
    //     expect(result).to.be.null;

    //     result = await instance.status(undefined);
    //     expect(result).to.be.undefined;

    //     result = await instance.status([]);
    //     expect(result).to.be.an('array').that.has.lengthOf(0);
    // });
};

export default runTests;