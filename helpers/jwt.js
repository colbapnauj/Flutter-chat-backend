const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
            // , nombre
        }
    
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '7d'

        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT')
            } else {
                resolve(token);
            }
    
        });
    });

}
const comprobarJWT = (token = '') => {
    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
}