const legData = require('../data/legData');
const stopData = require('../data/stopData');
const driverData = require('../data/driverData');

async function routes (fastify, options) {  
  fastify.get('/legs', async(request, reply) => {
    return { legData }
  })

  fastify.get('/stops', async(request, reply) => {
    return { stopData}
  })

  fastify.get('/driver', async(request, reply) => {
    return { driverData }
  })
  fastify.put('/driver', async(request, reply) => {
    driverData.driverData[0] = request.body;
    reply.status(200);
    reply.send('Driver information updated');
  })
}

module.exports = routes;