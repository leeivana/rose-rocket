async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/legs', async(request, reply) => {
    return { legs: 'legs'}
  })

  fastify.get('/stops', async(request, reply) => {
    return { stops: 'stops'}
  })

  fastify.get('/driver', async(request, reply) => {
    return { driver: 'driver'}
  })
}

module.exports = routes