const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mqlight = require('mqlight');
const { request, response } = require('express');
const { memoryUsage } = require('process');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3033;

// objeto para la conexión al broker
const options = {
    service: process.env.SERVICE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTBK
}

let urlencodeParser = bodyParser.urlencoded({ extended: false });
let errorPantalla;
let mensajesCola;
// Para subscribirse
const topic = '';

const service = process.env.SERVICE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const portBK = process.env.PORTBK;

// Configuraciones
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewears
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));



// Despliega la página
app.get('/', (req = require, res = response) => {
    res.render('enviar', {
        service,
        user,
        password,
        portBK
    });
});


// Ejecución del botón para enviar el mensaje
app.post('/', urlencodeParser, (req = require, res = response) => {

    // Se captura el mensaje de la página
    const mensaje = req.body.txtMensaje;
    console.log(mensaje);

    // Se crea la conexión al cliente
    const client = mqlight.createClient(options);

    client.on('error', (error) => {
        console.log('*****************************************');
        console.error('mqlight.createClient error send, service: %s', options);
        errorPantalla = error.message;
        if (error) {
            if (error.message) {
                console.error('message error send: %s', error.toString());
            }
            else if (error.stack) console.error(error.stack);
        }
    });

    // Cuando se tiene conexión
    client.on('started', () => {
        // Se realiza la conexión
        console.log('started');
        client.subscribe(topic, (error, pattern) => {
            if (error) {
                console.error('Problem with subscribe request: ', error.message);
            } else {
                console.log('Subscribe to pattern ', pattern);
                // Se manda el mensaje
                client.send(topic, mensaje);
            }
        });

        client.on('message', (data, delivery) => {
            console.log('Mensaje recibido ', data);
            console.log('Exiting');
            process.exit(0);
        })
    });

    console.log('errorPantalla', errorPantalla);
    res.render('enviar', {
        service,
        user,
        password,
        portBK
    });
});


// Mensajes del broker
app.get('/messages', (req = require, res = response) => {

    // Se crea la conexión al cliente
    const client = mqlight.createClient(options);

    client.on('error', (error) => {
        console.log('*****************************************');
        console.error('mqlight.createClient error send, service: %s', options);
        errorPantalla = error.message;
        if (error) {
            if (error.message) {
                console.error('message error send: %s', error.toString());
            }
            else if (error.stack) console.error(error.stack);
        }
    });

    // Cuando se tiene conexión
    client.on('started', () => {
        // Se realiza la conexión
        console.log('started');
        client.subscribe(topic, (error, pattern) => {
            if (error) {
                console.error('Problem with subscribe request: ', error.message);
            } else {
                console.log('Subscribe to pattern ', pattern);
            }
        });

        client.on('message', (data, delivery) => {
            console.log('Mensaje recibido ', data);
            mensajesCola = JSON.parse(data.body);
        })
    });

    mensajesCola = 'Mensajes de la cola ...';
    res.render('mensajes', {
        mensajesCola
    });
});



// Se inicia el servidor - inicio del programa
app.listen(port, () => console.log(`Server on: http://localhost:${port}  `));


