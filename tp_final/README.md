#### Agregar un .env con las siguientes variables

HOST = "localhost"
USER = "tu usuario"
PASSWORD = "tu contraseña"
DATABASE = "nombre bd"
PUERTO = 3000 (o el puerto donde quieras iniciarlo)

#### url de la api

http://localhost:3000/api/v1/

#### url obtener todos los salones (tambien para crear uno con metodo POST)

http://localhost:3000/api/v1/salones

#### url obtener un solo salon (tambien para editar o eliminar uno)

http://localhost:3000/api/v1/salones/1

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
