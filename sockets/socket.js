const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

// Mensajes de Socketsio
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

      // Verificar autenticación
    if ( !valido ) {return client.disconnect();}

    // console.log('cliente autenticado')
    usuarioConectado(uid);

    // Ingresar al usuario a una sala es particular
    // sala global, cliend.id, uid
    client.join( uid );
    // client.to(uid).emit('')

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async( payload ) => {
      // TODO Grabar mensaje
      await grabarMensaje(payload);

      io.to(payload.para).emit('mensaje-personal', payload);
    });



    // console.log(valido, uid);

    client.on('disconnect', () => { 
      usuarioDesconectado(uid);
    });
  
  //   client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);

  //     io.emit( 'mensaje', { admin: 'nuevo mensaje' } );
  // });

});