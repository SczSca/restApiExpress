# restApiExpress
Proyecto que consiste en una aplicación Node.js que corre en un servidor local (con intenciones de aprendizaje). En este proyecto se utiliza una base de datos MYSQL para el guardado de los datos del usuario. Esta aplicación  cuenta con controladores y un middleware para la creación, logeo y autenticación de logeo del usuario.

Para la creación del usuario se utiliza la dependencia "uuid". uuid es una alternativa para las llaves primarias en base de datos SQL. Generan, de forma aleatoria, un id global y único de 128 bit que son representados con 32 digitos hexadecimales en minuscula, separados en 5 grupos por guiones (8-4-4-4-12 caracteres). Las razones por la que se utiliza uuid son:
-No se revela información no pública en las URLs:
    Normalmente se utilizan o se despliegan las IDs dentro de la url: example.com/api/v1/users/5. Esto podría resultar en una vulnerabilidad de los datos. En cambio un id con caracteres de la estructura de un uuid sería mucho más complicado de adivinar. Además, si se tiene un autonúmerico, el usuario final puede darse una idea de la cantidad de registros de usuarios dentro de la base de datos.
-Más libertad para el desarrollador frontend:
    Permite generar nuevos objetos con uuid de forma independiente si estos no existen ya en la base de datos sin la necesidad de llamadas de APIs excesivas.

Otra dependencia que se tiene que detallar en la parte de creación y logeo es "bcryptjs". Esta dependencia nos permite hashear contraseñas con una formula de hasheo más el agregado de "salt" (piezas de datos aleatorios agregados a la contraseña antes de ser hasheada y guardada). La formula de esta dependencia utilizada en este proyecto es: bcrypt.hash(req.body.password, 10, (err, hash) => { //codigo a hacer }). El "10" hace referencia al factor costo, osease cuanto tiempo se necesita para calcular el hash de un simple BCrypt. Las rondas predeterminadas en esta dependencia es de 10, ya que la forma en la que trabaja es de 2^n (en este caso 2^10). Dato importante a reconocer es que esto no protege a los usuarios, sino que permite ganar tiempo para que logren cambiar las contraseñas de forma segura, en caso de que se haya comprometido las credenciales del usuario.

Como por último, se utilizaron dos dependencias más: jsonwebtoken- para el trato con las sesiones del usuario otorgandoles un token que les permita la interacción con las rutas protegidas y las funciones de estas- y cors para acceder a la rest API dentro del sitio web.

Al utilizar variables de entorno, se tienen dos plantillas para uso de desarrollo y de producción. Para ejecutar la aplicación utilizar en la consola los comandos "npm run dev" o "npm run prod" dependiendo de cual servidor se quiera utilizar. Esto viene en el package.json
