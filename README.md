# Proyecto Backend - API REST con NestJS, MongoDB, JWT y Swagger

Este proyecto es una API REST desarrollada con NestJS y MongoDB, que implementa autenticación mediante JWT y está documentada con Swagger. La API incluye operaciones CRUD para gestionar usuarios y productos, y protege sus endpoints sensibles mediante autenticación.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Documentación de la API (Swagger)](#documentación-de-la-api-swagger)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Notas Adicionales](#notas-adicionales)

## Características

- **Operaciones CRUD para Productos:** Crear, leer, actualizar y eliminar productos.
- **Autenticación con JWT:** Login, registro de usuarios y protección de endpoints mediante JWT.
- **MongoDB:** Conexión a base de datos MongoDB usando Mongoose.
- **Swagger:** Documentación interactiva de la API.
- **Middleware de Logging:** Registro de cabeceras para depuración de solicitudes.

## Tecnologías

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Requisitos

- Node.js (versión LTS recomendada)
- npm o yarn
- MongoDB (local o en la nube, por ejemplo, MongoDB Atlas)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
