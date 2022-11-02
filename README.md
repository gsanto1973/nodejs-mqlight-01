#IBM MQ Message broker

Proceso de instalación IBM MQ
-----------------------------

El instalador de IBM MQ se descarga de la dirección:
https://developer.ibm.com/tutorials/mq-connect-app-queue-manager-windows/#step-1-download-ibm-mq

Se debe descomprir y luego se ejecuta el siguiente comando - se reemplazan las rutas:
start /wait msiexec /i "C:\Users\cargs\Downloads\mqadv_dev930_windows\MQServer\MSI\IBM MQ.msi" /l*v "C:\Users\cargs\install.log" /q RESPONSE="C:\Users\cargs\Downloads\mqadv_dev913_windows\MQServer\Response.ini" TRANSFORMS="1033.mst" AGREETOLICENSE="yes" ADDLOCAL="Server"

Luego de instalar se prueba abriendo un CMD como administrador y se ejecuta:
echo %ERRORLEVEL%
debe devolver 0, indicando que la instalación fue éxitosa.

Luego se instala el MQ Explorer de IBM
Se debe crear una cuenta gratuita de IBM, se ingreso con LINKEDIN, o sea con giordano.santos.otero@gmail.com y su clave

Link de la creación de cuenta:
https://www.ibm.com/account/reg/es-es/signup?formid=urx-19776&target=https%3A%2F%2Flogin.ibm.com%2Foidc%2Fendpoint%2Fdefault%2Fauthorize%3FqsId%3D1b339152-c46a-4628-8344-aa8ba27303ed%26client_id%3DYmYwYmJiMTgtYjlhMi00

Se creó el IMB identificador - IBMid = giordano.santos.otero@gmail.com
-- esto no se terminó de instalar porque pide una autenticación que falló, se descragó en el celular IBM security verify, se escaneó la qr -- desde la página de autebticación de la cuenta de IBM, en la pestaña perfil.
Se había descargado el MQ Explorer en la carpeta downloaddirector y no en download, se instala y se ejecuta.


Para crear una cola, primero se debe crear el gestor o sea el servidor que tendra la cola

Se tiene instalado el IBM MQ en la ruta C:\Program Files\IBM\MQ\bin, se entra a ella:
cd "C:\Program Files\IBM\MQ\bin"

Se ejecuta el comando:
setmqenv -s
con esto se pueden emitir comandos de IBM MQ en cualquier parte del sistema, sin necesidad de estar en la ruta de instalación

Se puede ver la versión de instalada ejecutando el comando:
dspmqver
=>
C:\Program Files\IBM\MQ>dspmqver
Name:        IBM MQ
Version:     9.3.0.0
Level:       p930-L220607.DE
BuildType:   IKAP - (Production)
Platform:    IBM MQ for Windows (x64 platform)
Mode:        64-bit
O/S:         Windows 10 Unknown x64 Edition, Build 19043
InstName:    Installation1
InstDesc:
Primary:     Yes
InstPath:    C:\Program Files\IBM\MQ
DataPath:    C:\ProgramData\IBM\MQ
MaxCmdLevel: 930
LicenseType: Developer

Se crea el gestor:
crtmqm QM1
=>
C:\Program Files\IBM\MQ>crtmqm QM1
Se ha creado el gestor de colas de IBM MQ 'QM1'.
Se ha creado el directorio 'C:\ProgramData\IBM\MQ\qmgrs\QM1'.
El gestor de colas está asociado con la instalación 'Installation1'.
Creando o sustituyendo los objetos predeterminados para el gestor de colas 'QM1'.
Estadísticas de objetos por omisión: 86. 0 reemplazados. 0 han fallado.
Terminando la configuración.
Configuración finalizada.


El gestor se creó, pero no está activado, se debe ejecutar el siguiente comando para subir el gestor:
strmqm QM1
=>
C:\Program Files\IBM\MQ>strmqm QM1
El gestor de colas de IBM MQ 'QM1' se está iniciando.
El gestor de colas está asociado con la instalación 'Installation1'.
Se ha accedido a 6 registros de anotaciones en el gestor de colas 'QM1' durante la fase de ejecución de anotaciones.
Se ha completado la ejecución de anotaciones para el gestor de colas 'QM1'.
Se ha recuperado el estado del gestor de transacciones para el gestor de colas 'QM1'.
La comunicación de texto sin formato está habilitada.
El gestor de colas de IBM MQ 'QM1' se ha iniciado utilizando V9.3.0.0.


Después de iniciar el gestor, se deben crear los objetos para el administrador descargando desde GITHUB lo siguiente:
curl -o mq-dev-config.mqsc https://raw.githubusercontent.com/ibm-messaging/mq-dev-samples/master/gettingStarted/mqsc/mq-dev-config.mqsc

Luego de descargar, para agregar los objetos, ejecute esto:
runmqsc QM1<"C:\Users\cargs\Downloads\mq-dev-config.mqsc"
reemplazando la ruta donde se descargo el archivo
=>
C:\Program Files\IBM\MQ>runmqsc QM1<"C:\Users\cargs\Downloads\mq-dev-config.mqsc"
5724-H72 (C) Copyright IBM Corp. 1994, 2022.
Se está iniciando MQSC para el gestor de colas QM1.


: * ┬® Copyright IBM Corporation 2018
: *
: *
: * Licensed under the Apache License, Version 2.0 (the "License");
: * you may not use this file except in compliance with the License.
: * You may obtain a copy of the License at
: *
: * http://www.apache.org/licenses/LICENSE-2.0
: *
: * Unless required by applicable law or agreed to in writing, software
: * distributed under the License is distributed on an "AS IS" BASIS,
: * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
: * See the License for the specific language governing permissions and
: * limitations under the License.
:
     1 : STOP LISTENER('SYSTEM.DEFAULT.LISTENER.TCP') IGNSTATE(YES)
AMQ8706I: Se ha aceptado la petición para detener el escucha de IBM MQ.
       :
       : * Developer queues
     2 : DEFINE QLOCAL('DEV.QUEUE.1') REPLACE
AMQ8006I: Se ha creado la cola de IBM MQ.
     3 : DEFINE QLOCAL('DEV.QUEUE.2') REPLACE
AMQ8006I: Se ha creado la cola de IBM MQ.
     4 : DEFINE QLOCAL('DEV.QUEUE.3') REPLACE
AMQ8006I: Se ha creado la cola de IBM MQ.
     5 : DEFINE QLOCAL('DEV.DEAD.LETTER.QUEUE') REPLACE
AMQ8006I: Se ha creado la cola de IBM MQ.
       :
       : * Use a different dead letter queue, for undeliverable messages
     6 : ALTER QMGR DEADQ('DEV.DEAD.LETTER.QUEUE')
AMQ8005I: El gestor de colas IBM MQ ha cambiado.
       :
       : * Developer topics
     7 : DEFINE TOPIC('DEV.BASE.TOPIC') TOPICSTR('dev/') REPLACE
AMQ8690I: Se ha creado un tema de IBM MQ.
       :
       : * Developer connection authentication
     8 : DEFINE AUTHINFO('DEV.AUTHINFO') AUTHTYPE(IDPWOS) CHCKCLNT(REQDADM) CHCKLOCL(OPTIONAL) ADOPTCTX(YES) REPLACE
AMQ8563I: Se ha creado un objeto de información de autentificación de IBM MQ.
     9 : ALTER QMGR CONNAUTH('DEV.AUTHINFO')
AMQ8005I: El gestor de colas IBM MQ ha cambiado.
    10 : REFRESH SECURITY(*) TYPE(CONNAUTH)
AMQ8560I: Se ha renovado la antememoria de seguridad de IBM MQ.
       :
       : * Developer channels (Application + Admin)
    11 : DEFINE CHANNEL('DEV.ADMIN.SVRCONN') CHLTYPE(SVRCONN) REPLACE
AMQ8014I: Se ha creado un canal de IBM MQ.
    12 : DEFINE CHANNEL('DEV.APP.SVRCONN') CHLTYPE(SVRCONN) MCAUSER('app') REPLACE
AMQ8014I: Se ha creado un canal de IBM MQ.
       :
       : * Developer channel authentication rules
    13 : SET CHLAUTH('*') TYPE(ADDRESSMAP) ADDRESS('*') USERSRC(NOACCESS) DESCR('Back-stop rule - Blocks everyone') ACTION(REPLACE)
AMQ8877I: Se ha establecido el registro de autenticación de canal de IBM MQ.
    14 : SET CHLAUTH('DEV.APP.SVRCONN') TYPE(ADDRESSMAP) ADDRESS('*') USERSRC(CHANNEL) CHCKCLNT(REQUIRED) DESCR('Allows connection via APP channel') ACTION(REPLACE)
AMQ8877I: Se ha establecido el registro de autenticación de canal de IBM MQ.
    15 : SET CHLAUTH('DEV.ADMIN.SVRCONN') TYPE(BLOCKUSER) USERLIST('nobody') DESCR('Allows admins on ADMIN channel') ACTION(REPLACE)
AMQ8877I: Se ha establecido el registro de autenticación de canal de IBM MQ.
    16 : SET CHLAUTH('DEV.ADMIN.SVRCONN') TYPE(USERMAP) CLNTUSER('admin') USERSRC(CHANNEL) DESCR('Allows admin user to connect via ADMIN channel') ACTION(REPLACE)
AMQ8877I: Se ha establecido el registro de autenticación de canal de IBM MQ.
       :
       : * Developer listener
    17 : DEFINE LISTENER('DEV.LISTENER.TCP') TRPTYPE(TCP) PORT(1414) CONTROL(QMGR) REPLACE
AMQ8626I: Se ha creado el escucha de IBM MQ.
    18 : START LISTENER('DEV.LISTENER.TCP') IGNSTATE(YES)
AMQ8021I: Petición aceptada para iniciar el escucha de IBM MQ.
18 mandatos MQSC leídos.
Ningún mandato tiene un error de sintaxis.
Se han procesado todos los mandatos MQSC válidos.


Ahora se debe crear un usuario y un grupo para ejecutar aplicaciones cliente MQ
para abrir el gestor de grupos y usuarios se debe ejecutar en una ventana de comando como administrador:
C:\Windows\system32>netplwiz

Este comando no funciona con la version de windows 10, luego se debe crear un usuario por la parte de Panel de Control y
Crear una cuenta de usuario local
Seleccione Inicio  > Configuración  > Cuentas  y, a continuación, seleccione Familia y otros usuarios. (En algunas ediciones de Windows aparecerá Otros usuarios).
Selecciona Agregar a otra persona a este equipo.
Selecciona No tengo los datos de inicio de sesión de esta persona y, en la página siguiente, selecciona Agregar un usuario sin cuenta Microsoft.
Escribe un nombre de usuario, una contraseña, un indicio de contraseña o elige preguntas de seguridad, y luego selecciona Siguiente.

Se crea el usuario app, queda en el grupo Usuarios y no en el grupo mqclient(este grupo no se pudo crear) como indica la documentación
luego, se debe hacer lo siguiente:

Se da permisos al grupo Usuarios y usuario app:
setmqaut -m QM1 -t qmgr -g mqclient +connect +inq
Se reemplaza mqclient por Usuarios
setmqaut -m QM1 -t qmgr -g Usuarios +connect +inq
=>
C:\Program Files\IBM\MQ>setmqaut -m QM1 -t qmgr -g Usuarios +connect +inq
El mandato setmqaut se ha completado satisfactoriamente.

setmqaut -m QM1 -n DEV.** -t queue -g Usuarios +put +get +browse +inq
=>
C:\Program Files\IBM\MQ>setmqaut -m QM1 -n DEV.** -t queue -g Usuarios +put +get +browse +inq
El mandato setmqaut se ha completado satisfactoriamente.


En este momento se ha realizado lo siguiente:
Queue manager 	QM1
Queue 		DEV.QUEUE.1
Channel: 	DEV.APP.SVRCONN
Listener: 	SYSTEM.LISTENER.TCP.1 on port 1414
El usuario app, que es miembro del grupo Usuarios tiene permitido:
 - usar el canal DEV.APP.SVRCONN
 - conectarse al gestor de colas QM1
 - Usuario app puede colocar y obtener mensajes en y desde la cola DEV.QUEUE.1.


Prueba de colocar y obtener mensajes:

Primero se deben ejecutar estas dos líneas para confirgurar
MQSERVER especifica el endpoint del gestor de colas.
MQSAMP_USER_ID especifica la cuenta que tiene permisos para ejecutar los programas ejemplo incluidos.

set MQSERVER=DEV.APP.SVRCONN/TCP/localhost(1414)
set MQSAMP_USER_ID=app

Nos pasamos para la carpeta donde están los ejemplos para ejecutar:
cd C:\Program Files\IBM\MQ\tools\c\Samples\Bin64

Para ingresar un mensaje se debe ejecutar:
amqsputc DEV.QUEUE.1 QM1

Pide el password del usuario creado app, que es passw0rd


Ahora se pueden ingresar mensajes separados por un enter
y se finaliza con doble enter

C:\Program Files\IBM\MQ\tools\c\Samples\Bin64>amqsputc DEV.QUEUE.1 QM1
Sample AMQSPUT0 start
Enter password: ********
target queue is DEV.QUEUE.1
Hola, primer mensaje
Es una prueba de mensajeria

Sample AMQSPUT0 end

C:\Program Files\IBM\MQ\tools\c\Samples\Bin64>


Ahora se leen los mensajes de la cola, los trae todos y espera 15 segundos para finalizar

amqsgetc DEV.QUEUE.1 QM1

C:\Program Files\IBM\MQ\tools\c\Samples\Bin64>amqsgetc DEV.QUEUE.1 QM1
Sample AMQSGET0 start
Enter password: ********
message <otra prueba>
message <final de otra prueba>
no more messages
Sample AMQSGET0 end


Cuando se reinicia la maquina, se detiene el gestor y se desconfigura el server y el user
luego para subir todo se debe:
- verificar que el servivio IBM este en ejecución, en caso de no estarlo, se debe subir
- subir el gestor de colas, en este caso se llama QM1 y con el comando:
    strmqm QM1 ( para detener un gestor de colas se debe ejecutar endmqm QM1)
- se debe setear el server (server:localhost puerto:1414) y el user(en este caso app fue el usuario creado):
    set MQSERVER=DEV.APP.SVRCONN/TCP/localhost(1414)
    set MQSAMP_USER_ID=app

Ahora si se puede volver a encolar y desencolar mensajes en la cola, en este caso DEV.QUEUE.1, como se describió más arriba
amqsputc y amqsgetc desde la ruta de ejemplos, donde se encuentran estos ejecutables
C:\Program Files\IBM\MQ\tools\c\Samples\Bin64>


Para examinar una cola se debe ejecutar el comando:
C:\Program Files\IBM\MQ\tools\c\Samples\Bin64>amqsbcg DEV.QUEUE.1 QM1


Las colas no se definen con tipo como "AMQP", son los canales que tienen las cosas los que tienen esta clasificación.
Las colas tienen otros tipos de clasificación, por ejemplo se creo una cola llamada DEV.QUEUE.1 y esta de tipo "Local".


Para crear un canal AMQP, se debe:
- abrir un CMD del sistema como administrador
- se ejecuta el comando runmqsc y el nombre del gestor de colas
    runmqsc QM_NODE01
- esto abre un entorno de edición que recibe los siguientes comandos:
    DISPLAY CHANNEL(*) CHLTYPE(AMQP)
    DEFINE CHANNEL(MY.AMQP.CHANNEL) CHLTYPE(AMQP) PORT(5673)
    START CHANNEL(MY.AMQP.CHANNEL)
    STOP CHANNEL(MY.AMQP.CHANNEL)
    DISPLAY CHSTATUS(*) CHLTYPE(AMQP)
- se pudo crear el canal, pero las instraucciones propias de AMQP no se reconocen porque no se tiene activo el servicio AMQP
  al ejecutar lo siguiente se observa que está seteado a NO:
    display qmgr amqpcap
      13 : display qmgr amqpcap
      AMQ8408I: Ver detalles del Gestor de colas.
      QMNAME(QM_NODE01)                       AMQPCAP(NO)
  luego, no se puede ejecutar y subir el canal amqp, por ejemplo:
      START CHANNEL(MY.AMQP.CHANNEL)
  indica error.


Proceso de instalación programa node js
---------------------------------------

Se debe descargar el código fuente de GIT en alguna carpeta y se descomprime.

Se debe abrir un CMD dentro de esta carpeta y se ingresa en la carpeta nodejs-mqlight-01-main.

En esta carpeta se debe ejecutar:
   npm i
Con esto se instalan todas las librerias o dependencias necesarias por el programa indicadas en el archivo package.json.
Esto también se puede realizar desde el editor Visual Estudio Code, entrando al proyecto y en una terminal integrado desde la carpeta nodejs-mqlight-01-main y se ejecuta la misma instrucción.

Se puede ejecutar el código en modo desarrollo (nodemon ...) ejecutando en la terminal integrada lo siguiente:
   npm run dev

Se puede ejecutar el código en modo producción (node ...) ejecutando en la terminal integrada lo siguiente:
   npm run start



Funcionamiento del programa node js
---------------------------------------

El código presenta una página donde se puede capturar un mensaje y se envía a la cola subscrita.
Los datos de conexión son:
Servidor: localhost
Usuario: app
Password: passw0rd
Puerto: 1414
Estos datos corresponden al servidor local.

Cuando el programa está en ejecución, se abre el navegador de internet en la dirección:
http://localhost:3003/
Con esto se muestra la página donde se escribe el mensaje y se envía a través del botón Enviar.
Esto levanta el metodo que se conecta a la cola y le envía el mensaje.
Si se presenta un error en el proceso de conexión, este se muestra en consola.
Si se entra a la dirección:
http://localhost:3003/messages
Se muestra una página donde se muestran los mensajes de la cola, a los cuales se subscribió.


