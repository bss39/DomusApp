# DomusApp
### En este proyecto se ha desarrollado una aplicación móvil usable sobre domótica para el Trabajo de Fin de Grado de Ingeniería Multimedia de la Universidad de Alicante.
#
## Puesta en marcha
- Crear una base de datos MySQL con la configuración que se indica en el fichero *[configbd.js](/backend/database/configbd.js)*.
- Ejecutar en la base de datos los ficheros *[domusDDL.sql](/doc/BD/domusDDL.sql)* y *[domusDML.sql](/doc/BD/domusDML.sql)*, en ese orden.
- Instalar los módulos necesarios para frontend y backend:
~~~ 
npm install 
~~~ 
- Iniciar el backend:
~~~ 
nodemon index.js
~~~
- Iniciar el frontend:
~~~ 
ionic lab
~~~
