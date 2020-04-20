# All-Sec, proyecto escolar

Permite transmitir a través de la tecnología de Socket.io, el stream de dos cámaras del ordenador

# Instalar

Para cargar las dependencias, utilizar el comando:
`npm install`

Para configurar el acceso a la base de datos:

1. Modificar el archivo: `./router/credentials.js`, el objecto `database` y colocar sus respectivas credenciales

```
    host: [Tu host],
    port: [Tu puerto],
    user: [Tu usuario],
    password: [Contraseña],
    database: 'all_sec_master'
```

2. Modificar el archivo: `./router/credentials`, el objecto `email` y colocar sus respectivas credenciales

```
    mail: [Tu correo de Gmail],
    password: [Contraseña de Gmail]
```

3. Cargar la base de datos: `./sql/database.sql`

4. Correr el proyecto: `npm run dev` o `node index.js`
