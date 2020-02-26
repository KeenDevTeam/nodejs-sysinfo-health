/**
 * Tests entry point
 */

import "mocha";
import { expect } from "chai";

import MyLib from "../src";

describe("My TS module", () => {

    it("should always return true", () => {

        expect(true).to.be.eq(true);
    });
});