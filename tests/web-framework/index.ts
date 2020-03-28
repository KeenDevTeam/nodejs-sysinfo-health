/**
 * Web framework tests
 */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import Express from 'express';

import { createEndpoint as createExpressRoute } from "../../src/lib/web-framework/Express";
import { createEndpoint as createMicroRoute } from "../../src/lib/web-framework/Micro";

import MockHealthService from '../mock/MockHealthService';

chai.use(chaiHttp);

const runTests = () => {

    describe('express', () => {

        beforeEach(function (done) {

            const appMocked = Express();
            const healthService = new MockHealthService();

            const services = ['a', 'b', 'c', 'd'];

            appMocked.get('/none', createExpressRoute(healthService));
            appMocked.get('/some', createExpressRoute(healthService, ['b', 'c']));
            appMocked.get('/all', createExpressRoute(healthService, [...services]));

            this.ctx = {
                services,
                appMocked
            };

            done();
        });

        it('should throw error', async function () {

            expect(() => createExpressRoute(undefined)).throw('healthService must be a valid instance of IHealthService');
        });

        it('should return no service', async function () {

            const response = await chai.request(this.ctx.appMocked).get('/none');

            expect(response.status).to.be.eq(200);
            expect(response.body).to.be.an('object');
            expect(Object.keys(response.body).length).to.be.eq(0);
        });

        it('should return 2 services', async function () {

            const response = await chai.request(this.ctx.appMocked).get('/some');

            expect(response.status).to.be.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.eq(2);
        });

        it('should return all services', async function () {

            const response = await chai.request(this.ctx.appMocked).get('/all');

            expect(response.status).to.be.eq(200);
            expect(response.body).to.be.an('array');

            expect(response.body.length).to.be.eq(this.ctx.services.length);
        });
    });

    describe('micro', () => {

        it('should throw error', async function () {

            expect(() => createMicroRoute(undefined)).throw('healthService must be a valid instance of IHealthService');
        });

        it('should return all services', async function () {

            const response = await chai.request(this.ctx.appMocked).get('/all');

            expect(response.status).to.be.eq(200);
            expect(response.body).to.be.an('array');

            expect(response.body.length).to.be.eq(this.ctx.services.length);
        });        
    });
};

export default runTests;