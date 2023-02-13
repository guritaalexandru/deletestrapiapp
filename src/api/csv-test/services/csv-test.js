'use strict';

/**
 * csv-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::csv-test.csv-test');
