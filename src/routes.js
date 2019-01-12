const legData = require('../data/legData');
const stopData = require('../data/stopData');
const driverData = require('../data/driverData');

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { info: 'main' }
  })

  fastify.get('/legs', async(request, reply) => {
    return { legData }
  })

  fastify.get('/stops', async(request, reply) => {
    return { stopData}
  })

  fastify.get('/driver', async(request, reply) => {
    return { driverData }
  })
}

module.exports = routes