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
    console.log('Connection Established!!!')
    socket.on('message', event => {
      const data = JSON.parse(event); 
      socket.send(JSON.stringify({...data}));
    })
    socket.on('close', () => console.log('Client disconnected.'))
  })
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log('listening on port 3000')
})
