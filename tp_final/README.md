#### Agregar un .env con las siguientes variables

HOST = "localhost"
USER = "tu usuario"
PASSWORD = "tu contraseña"
DATABASE = "nombre bd"
PUERTO = 3000 (o el puerto donde quieras iniciarlo)

USER_EMAIL=tucorreo@gmail.com
PASS_EMAIL=pass app email
DEST_EMAIL=passdestino@gmail.com

#### url de la api

http://localhost:3000/api/

#### url obtener todos los salones (tambien para crear uno con metodo POST)

http://localhost:3000/api/salones

#### url obtener un solo salon (tambien para editar o eliminar uno)

http://localhost:3000/api/salones/1

### Datos de prueba para crear un salon

en postman/bruno/etc agregar en el body > raw

```
{
    "titulo": "Salon nuevo",
    "direccion": "Calle prueba 123",
    "latitud":-36.124324,
    "longitud":-36.124324,
    "capacidad":67,
    "importe": 98000
}
```

#### Consideraciones extra:

- Leer el README-TEST.md
- Acceder con cd a la carpeta tp_final
- Realizar un npm install luego de clonar el repo
- Crear el env con los datos requeridos al inicio
- Ejecutar el sql en la db que se encuentra en src > db > procedimientos.sql
- Ejecutar npm run des para levantar el proyecto

#### Participantes:

- Acuña Cristian Mateo
- Minatta Federico
- Arce Joaquin
- Velarde Adrián Alejandro
- Lurdes Micaela Velarde
- Diego Gomez

### Link del video:
https://drive.google.com/file/d/1xRtcUJVeeC4ugPWt-WW2CpZ0tg9JuHux/view?usp=sharing
