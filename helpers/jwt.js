const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
            // , nombre
        }
    
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT')
            } else {
                resolve(token);
            }
    
        });
    });

}

module.exports = {
    generarJWT
}