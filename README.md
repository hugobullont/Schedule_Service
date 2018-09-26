# ScheduleService

ScheduleService es un REST Web Service que maneja un horario universitario con clases, exámenes y trabajos.

## Utilización

Estas vagas instrucciones te mostrarán como correr el servicio en un servidor local. 

### Pre-requisitos

Es necesario tener instalado [Node.js](https://nodejs.org/en/) y [MongoDB](https://www.mongodb.com).

### Instalación

Lo recomendable es seguir este tutorial al pie de la letra si no quieres que algo explote.

Lo primero que necesitamos es clonar el proyecto.

```
git clone https://github.com/hugobullont/Schedule_Service.git
```

Luego entramos al proyecto e instalamos los paquetes npm

```
cd Schedule_Service
npm install
```

En otra pantalla del terminal ejecutamos MongoDB (Si es que ya no está siendo ejecutado)

```
sudo mongod
```

Si lo estás ejecutando en Windows, revisa este [tutorial](https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows) 

Finalmente ejecutamos el servidor en el terminal con el que instalamos los paquetes npm

```
node server.js
```

### Probando

El servicio ya se debería estar ejecutando si seguiste correctamente los pasos en http://localhost:3000/

Las llamadas que puedes realizar son:

```
POST    /cursos                 		Crea un curso (ver modelo abajo)
GET     /cursos                 		Retorna todos los cursos
GET     /clases/{dia}           		Retorna las clases de un día
GET     /clases/{dia}/{hora}    		Retorna la clase más cercana + info del curso
GET	/trabajos/{cursoID}/{fecha}		Retorna el trabajo más cercano de un curso
GET	/examenes/{cursoID}/{fecha}		Retorna el examen más cercano de un curso
```
Considera dia como un día de la semana en español (ejemplo: Lunes) y la hora en el formato HHMM como número. (Para las fechas: YYYYMMDD).

A continuación el modelo de body que debes mandar en el POST de Curso:

```
    {
        "nombre": "Taller de Desempeño Profesional",
        "profesor": "Marco Bruggman",
        "faltasRestantes": 5,
        "trabajos": [{
        	"fechaDeEntrega": 20180928,
    		"tipo": "Parcial",
    		"grupal": true
        }],
        "examenes": [{
        	"fecha": 20181005,
    		"tipo": "Parcial",
    		"temas": ["Tema 1","Tema 2"]
        }],
        "clases": [{
        	"horaInicio": 1600,
    		"horaFinal": 1900,
			"salon": "H51",
    		"dia": "Lunes",
    		"tipo": "Presencial"
        },{
        	"horaInicio": 1600,
    		"horaFinal": 1900,
			"salon": "D17",
    		"dia": "Jueves",
    		"tipo": "Presencial"
        }]
    }
```

Para probar puedes utilizar las siguientes llamadas:

```
/cursos             Retornará los cursos ingresados
/clases/Lunes       Retornará solo la info de las clases los Lunes
/clases/Lunes/1300  Retornará la clase más cercana a las 13:00 (o la clase que esté ocurriendo en ese momento)
```

## Desarrollado usando 

[Node.js](https://nodejs.org/en/) - La Nueva Moda

[MongoDB](https://www.mongodb.com) - Los Amigos de Verdad no dejan que los Amigos usen BD's Relacionales

[Express](https://expressjs.com) - El Web Framework de la Nueva Moda

[Mongoose](https://mongoosejs.com) - Modelado de Datos para la Nueva Moda


