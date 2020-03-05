# Health service

This module provides some information about your service.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

```sh

# NPM
npm i @speedup/sysinfo-health --save

# Yarn
yarn install @speedup/sysinfo-health

```

## Parts

This module consists of 3 main parts.

1. HealthService (which is responsible for retrieving health information from the requested providers).
2. InfoProvider (which is responsible for providing health information)
3. WebFramework (which is responsible for integrating with the web frameworks).

## Usage

```js

const serviceHealth = require('@speedup/sysinfo-health');

const infoProvider = new serviceHealth.InfoProvider({
    loadDefaultProviders: true
});

const healthProvider = new serviceHealth.HealthProvider(config, infoProvider);

// inside your async function, try
const health = await healthProvider.retrieve();

// returns an object that contains the health information


// you can return only the information about specific parts of the hardware/software
// by providing the list of modules
// built-in info services: CPU, memory, OS, path, uptime, user
const health = await healthProvider.retrieve(['CPU', 'memoy']);

```

And you're good to go!

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@speedup/sysinfo-health.svg?color=orange
[npm-url]: https://npmjs.org/package/@speedup/sysinfo-health
[downloads-image]: https://img.shields.io/npm/dt/@speedup/sysinfo-health.svg
[downloads-url]: https://npmjs.org/package/@speedup/sysinfo-health