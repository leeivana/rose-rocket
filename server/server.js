const fastify = require('fastify')({
  logger: true
});
const cors = require('cors');
fastify.register(require('fastify-ws'));
fastify.register(require('../src/routes'));
fastify.use(cors());

fastify.ready(err => {
  if (err) throw err

  fastify.ws.on('connection', socket => {
    console.log('connection')
    socket.on('message', msg => {
      console.log(msg)
      socket.send(msg)
    })
  })
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log('listening')
})
