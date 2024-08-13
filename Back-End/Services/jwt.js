//dependencias 
const jwt =require("jwt-simple");
const moment = require("moment");

//clave secreta
const secret ="CLAVE_SECRETA_DEL_ADMIN_12082024";



//crear una fuction para generar tokens
const createToken =(alumno)=>{
        const payload ={
            id:alumno.id,
            fechaNacimiento:alumno.fechaNacimiento,
            nomPadre:alumno.nomPadre,
            nomMadre:alumno.nomMadre,
            email:alumno.email,
            grado:alumno.grado,
            seccion:alumno.seccion,
            fechaIngreso:alumno.fechaIngreso,
           iat:moment().unix(), //momento en el que se esta creando
           exp:moment().add({seconds:'600000'}).unix(),//fecha de expircion del token
   };

   //Devolver jwt token codificado
   
   return jwt.encode(payload,secret);


}
 
module.exports= {
   secret,
    createToken
    
}