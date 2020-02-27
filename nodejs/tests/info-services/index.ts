/**
 * InfoServices tests
 */

import { expect } from 'chai';
import { createCheckers } from 'ts-interface-checker';

import InfoServices from '../../src/lib/info-services';

import CPU from '../../src/lib/info-services/CPU';

import IInfoService from '../../src/lib/interfaces/IInfoService';
import IInfoServiceTI from '../interfaces/IInfoService-ti';

const runTests = () => {

    describe('built-in services', () => {

        describe('CPU', () => {

            it('should implement IInfoService', () => {

                // class constructor
                expect(InfoServices['CPU']).to.be.a('function');

                // type check
                const instance = InfoServices['CPU'](undefined);

                // interface check
                const { IInfoService: IInfoServiceTypeChecker } = createCheckers(IInfoServiceTI);
                IInfoServiceTypeChecker.check(instance);
            });

            it('should return CPU info', async () => {

                // type check
                const instance = InfoServices['CPU'](undefined);

                // interface check
                const result = await instance.retrieve();

                expect(result).to.be.an('object');
                expect(result).to.have.property('usage').which.is.an('object');
                expect(result).to.have.property('cores').which.is.an('array');

                expect(result.cores.length).to.be.gte(1);
            });
        });

        describe('Memory', () => {

            it('should implement IInfoService', () => {

                // class constructor
                expect(InfoServices['Memory']).to.be.a('function');

                // type check
                const instance = InfoServices['Memory'](undefined);

                // interface check
                const { IInfoService: IInfoServiceTypeChecker } = createCheckers(IInfoServiceTI);
                IInfoServiceTypeChecker.check(instance);
            });

            it('should return memory info', async () => {

                // type check
                const instance = InfoServices['Memory'](undefined);

                // interface check
                const result = await instance.retrieve();

                expect(result).to.be.an('object');
                expect(result).to.have.property('usage').which.is.an('object');
                expect(result).to.have.property('total').which.is.a('number');
                expect(result).to.have.property('free').which.is.a('number');
            });
        });

        describe('OS', () => {

            it('should implement IInfoService', () => {

                // class constructor
                expect(InfoServices['OS']).to.be.a('function');

                // type check
                const instance = InfoServices['OS'](undefined);

                // interface check
                const { IInfoService: IInfoServiceTypeChecker } = createCheckers(IInfoServiceTI);
                IInfoServiceTypeChecker.check(instance);
            });

            it('should return operating system info', async () => {

                // type check
                const instance = InfoServices['OS'](undefined);

                // interface check
                const result = await instance.retrieve();

                expect(result).to.be.an('object');
                expect(result).to.have.property('platform').which.is.an('string');
                expect(result).to.have.property('release').which.is.a('string');
                expect(result).to.have.property('type').which.is.a('string');
                expect(result).to.have.property('hostname').which.is.a('string');
            });
        });

        describe('Path', () => {

            it('should implement IInfoService', () => {

                // class constructor
                expect(InfoServices['Path']).to.be.a('function');

                // type check
                const instance = InfoServices['Path'](undefined);

                // interface check
                const { IInfoService: IInfoServiceTypeChecker } = createCheckers(IInfoServiceTI);
                IInfoServiceTypeChecker.check(instance);
            });

            it('should return path info', async () => {

                // type check
                const instance = InfoServices['Path'](undefined);

                // interface check
                const result = await instance.retrieve();

                expect(result).to.be.an('object');
                expect(result).to.have.property('cwd').which.is.an('string');
            });
        });

        describe('Uptime', () => {

            it('should implement IInfoService', () => {

                // class constructor
                expect(InfoServices['Uptime']).to.be.a('function');

                // type check
                const instance = InfoServices['Uptime'](undefined);

                // interface check
                const { IInfoService: IInfoServiceTypeChecker } = createCheckers(IInfoServiceTI);
                IInfoServiceTypeChecker.check(instance);
            });

            it('should return uptime info', async () => {

                // type check
                const instance = InfoServices['Uptime'](undefined);

                // interface check
                const result = await instance.retrieve();

                expect(result).to.be.an('object');
                expect(result).to.have.property('process').which.is.an('object');
                expect(result).to.have.property('os').which.is.an('object');
            });
        });

        describe('User', () => {

            it('should implement IInfoService', () => {

                // class constructor
                expect(InfoServices['User']).to.be.a('function');

                // type check
                const instance = InfoServices['User'](undefined);

                // interface check
                const { IInfoService: IInfoServiceTypeChecker } = createCheckers(IInfoServiceTI);
                IInfoServiceTypeChecker.check(instance);
            });

            it('should return user info', async () => {

                // type check
                const instance = InfoServices['User'](undefined);

                // interface check
                const result = await instance.retrieve();

                expect(result).to.be.an('object');
                expect(result).to.have.property('username').which.is.a('string');
                expect(result).to.have.property('uid').which.is.a('number');
                expect(result).to.have.property('gid').which.is.a('number');
                expect(result).to.have.property('shell').which.is.an('string');
                expect(result).to.have.property('homedir').which.is.an('string');
            });
        });
    });
};

export default runTests;