/**
 * Tests entry point
 */

import 'mocha';
import { expect } from 'chai';
import { createCheckers } from 'ts-interface-checker';

import InfoServicesTests from "./info-services";
import WebFrameworkTests from "./web-framework";
import HealthServiceTests from "./HealthService";
import InfoProviderTests from "./InfoProvider";

import myLib from '../src';
import HealthService from '../src/lib/HealthService';
import InfoProvider from '../src/lib/InfoProvider';

import MockInfoProvider from './mock/MockInfoProvider';
import { InfoProviderConfigEmpty } from './mock/InfoProviderConfig';

import IHealthServiceTI from './interfaces/IHealthService-ti';
import IInfoProviderTI from './interfaces/IInfoProvider-ti';

describe('My TS module', () => {

    describe('Module integrity', () => {

        it('module should be an object', () => {
            expect(typeof myLib).to.be.eq('object');
        });

        it('should have only 3 properties', () => {
            expect(Object.keys(myLib).length).to.be.eq(3);
        });

        // converted to any
        // prevents error: TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type...
        const anyLib: any = myLib as any;

        ['HealthService', 'InfoProvider', 'webFramework']
            .map((propertyName: string) => {

                it(`Property 'myLib.${propertyName}' should be an object`, () => {
                    expect(anyLib[propertyName]).not.to.be.null;
                    expect(anyLib[propertyName]).not.to.be.undefined;
                });
            });

        it('HealthService should be an instance of HealthService and implements IHealthService', () => {

            // class constructor
            expect(myLib.HealthService).to.be.a('function');

            // type check
            const instance = new myLib.HealthService({}, new MockInfoProvider());
            expect(instance).to.be.instanceOf(HealthService);

            // interface check
            const { IHealthService: IHealthServiceTypeChecker } = createCheckers(IHealthServiceTI);
            IHealthServiceTypeChecker.check(instance);
        });

        it('InfoProvider should be an instance of InfoProvider and implements IInfoProvider', () => {

            // class constructor
            expect(myLib.InfoProvider).to.be.a('function');

            // type check
            const instance = new myLib.InfoProvider(new InfoProviderConfigEmpty());
            expect(instance).to.be.instanceOf(InfoProvider);

            // interface check
            const { IInfoProvider: IInfoProviderTypeChecker } = createCheckers(IInfoProviderTI);
            IInfoProviderTypeChecker.check(instance);
        });

        it('webFramework should be an object', () => {

            // class constructor
            expect(myLib.webFramework).to.be.a('object');

            expect(myLib.webFramework).to.have.property('Express').which.is.a('function');
        });
    });

    describe('info-services', InfoServicesTests);
    describe('web-framework', WebFrameworkTests);
    describe('HealthService', HealthServiceTests);
    describe('InfoProvider', InfoProviderTests);
});