'use strict';

/**
 * csv-test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::csv-test.csv-test');
