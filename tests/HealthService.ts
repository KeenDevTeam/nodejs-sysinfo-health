/**
 * HealthService
 */

import { expect } from 'chai';
import { createCheckers } from 'ts-interface-checker';

import HealthService from '../src/lib/HealthService';
import MockInfoProvider from './mock/MockInfoProvider';

import IHealthServiceTI from "./interfaces/IHealthService-ti";

const runTests = () => {

    it('should implement IHealthService', () => {

        // class constructor
        expect(HealthService).to.be.a('function');

        // type check
        const instance = new HealthService({}, new MockInfoProvider());

        // interface check
        const { IHealthService: IHealthServiceTypeChecker } = createCheckers(IHealthServiceTI);
        IHealthServiceTypeChecker.check(instance);
    });

    it('should throw error if config is null', () => {

        expect(() => new HealthService(null, new MockInfoProvider())).to.throw('config cannot be null or undefined');
    });

    it('should throw error if config is undefined', () => {

        expect(() => new HealthService(undefined, new MockInfoProvider())).to.throw('config cannot be null or undefined');
    });

    it('should throw error if infoProvider is null', () => {

        expect(() => new HealthService({}, null)).to.throw('infoProvider cannot be null or undefined');
    });

    it('should throw error if infoProvider is undefined', () => {

        expect(() => new HealthService({}, undefined)).to.throw('infoProvider cannot be null or undefined');
    });

    it('should return exact value', async function () {

        // type check
        const instance = new HealthService({}, new MockInfoProvider());

        let result = await instance.status(null);
        expect(result).to.be.null;

        result = await instance.status(undefined);
        expect(result).to.be.undefined;

        result = await instance.status([]);
        expect(result).to.be.an('array').that.has.lengthOf(0);
    });
};

export default runTests;