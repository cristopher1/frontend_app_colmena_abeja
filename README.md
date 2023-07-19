# [FRONTEND APP COLMENA ABEJA](#indice)

El presente proyecto fue desarrollado durante el ramo **trabajo de titulo**, para optar al titulo de **ingenierío civil informático** en la Universidad Técnica
Federico Santa María (UTFSM). Frontend que se conecta con la [API COLMENA ABEJA](https://github.com/cristopher1/api_colmena_abeja). Si quiere facilitar el
despliegue del sistema, mediante automatización, vaya al repositorio [APP_COLMENA_ABEJA](https://github.com/cristopher1/app_colmena_abeja)

### <a id="indice"></a> Índice

* <a id="introduccion"></a>[Introducción](#Introducción)
* <a id="pre-rrequisitos"></a> [Prerrequisitos](#Prerrequisitos)
* <a id="descarga"></a> [Descargar el repositorio](#Descargar-el-repositorio)
* <a id="entorno"></a>[Variables de entorno](#Variables-de-entorno)
* <a id="dockerfile"></a>[Docker](#Docker)
* <a id="run"></a>[Ejecutar la aplicación](#Ejecutar-la-aplicación)

## <a id="Introducción"></a> [Introducción](#introduccion)

El presente repositorio contiene el Frontend utilizado por el sistema APP COLMENA ABEJA. Este Frontend contiene toda la interfaz gráfica
(basada en un diseño de startbootstrap) que permite al usuario realizar peticiones web a la API COLMENA ABEJA mediante `axios`, los resultados y ventanas emergentes informativas son desplegados usando `sweetalert2`.

## <a id="Prerrequisitos"></a> [Prerrequisitos](#pre-rrequisitos)

El sistema ha sido probado en SO Windows 11.

* Docker Desktop con Servidor WSL 2. Ver documentación sobre [Docker Desktop para Windows](https://docs.docker.com/desktop/install/windows-install/)

## <a id="Descargar-el-repositorio"></a> [Descargar el repositorio](#descarga)

Para descargar el repositorio use:

```console
git clone git@github.com:cristopher1/frontend_app_colmena_abeja.git
```

## <a id="Variables-de-entorno"></a> [Variables de entorno](#entorno)

La información de las variables de entorno se encuentra dentro del archivo .env.example.
https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/.env.example#L1-L30

* ```VUE_APP_API_PROTOCOL```: Protocolo usado para conectarse con la API.
  
* ```VUE_APP_API_HOST```: Nombre de host donde se hospeda la API.
  
* ```VUE_APP_API_PORT```: Puerto donde la API escucha las peticiones.
  
* ```VUE_APP_API_PATH```: PATH donde la API responde las peticiones.

## <a id="Docker"></a> [Docker](#dockerfile)

El sistema incluye un archivo **Dockerfile**, para poder facilitar su despliegue.
https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/Dockerfile#L1-L56

dividido en 4 etapas: base, development, build y production.

* En la etapa development: Se incluyen herramientas para desarrollo, como nano. Tambíén se despliega el sistema usando el servidor de desarrollo de VUE
utilizando el puerto 8080 para escuchar las peticiones web.
https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/Dockerfile#L22-L25

* En la etapa production:
  * Primero se llama a la etapa build, donde se empaquetarán todos los archivos necesarios para que el sistema pueda funcionar en modo producción.  
    https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/Dockerfile#L27-L44
    
    Generando una carpeta dist dentro del directorio de trabajo actual (WORKDIR). 
    https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/Dockerfile#L30
    
  * En la etapa de producción se usará nginx para desplegar el sistema, usando el puerto 80 para recibir las peticiones web.
    https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/Dockerfile#L52-L56
    
    El contenido de la carpeta dist se coloca dentro de nginx/html.
    https://github.com/cristopher1/frontend_app_colmena_abeja/blob/e40f08b27ad304aee5951bce663e31e9584840cf/Dockerfile#L50

## <a id="Ejecutar-la-aplicación"></a> [Ejecutar la aplicación](#run)

Para ejecutar la aplicación siga los siguientes pasos.

* **Nota: El archivo Dockerfile de este repositorio utiliza multi-stage, por lo que no debe olvidar habilitar el docker BuildKit al momento de**
**ejecutar la aplicación.**

* **Nota: A partir de la versión 23.0 de Docker Desktop y Docker Engine se usa de forma predeterminada el BuildKit por lo que no es necesario habilitarlo**
**de forma manual.**

1. Ingrese a la carpeta frontend_app_colmena_abeja (por la teminal o interfaz gráfica)
2. Cree un archivo llamado .env (en la misma carpeta donde esta el archivo .env.example)
3. Copie el contenido del archivo .env.example a .env
4. Si gusta, modifique los valores del archivo .env
6. Abra una terminal e ingrese a la carpeta frontend_app_colmena_abeja
8. Ejecute los siguientes comandos:
   * Para modo desarrollo:
     * Crear la imagen:
       ```console
       docker build --target development -t frontend_app_colmena_abeja_dev .
       ```
     * Ejecutar el contenedor:
       ```console
       docker run -p host_port:8080 --env-file .env frontend_app_colmena_abeja_dev
       ```
       Reemplace **host_port** por el puerto en su host, por el cual las peticiones web serán redirigidas al contenedor docker.
       
   * Para modo producción:
     * Crear la imagen:
       ```console
       docker build --target production -t frontend_app_colmena_abeja_prod .
       ```
     * Ejecutar el contenedor:
       ```console
       docker run -p host_port:80 --env-file .env frontend_app_colmena_abeja_prod
       ```
       Reemplace **host_port** por el puerto en su host, por el cual las peticiones web serán redirigidas al contenedor docker.

Una vez completados los pasos, el sistema debería estar ejecutandose en `http://localhost:host_port`
