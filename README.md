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

2. Instala las dependencias:

npm install o si usas yarn:

yarn install

### Configuración

Crea un archivo .env en la raíz del proyecto con la siguiente configuración (actualiza los valores según tu entorno):

**.env**

# Configuración de MongoDB
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.fl17i.mongodb.net/test?retryWrites=true&w=majority

# Configuración de JWT
JWT_SECRET=mi_clave_secreta_para_jwt
JWT_EXPIRES_IN=3600s
Importante: No versionar el archivo .env para evitar exponer información sensible.

### Ejecución
Para arrancar la aplicación en modo desarrollo, ejecuta:

# Para el back 
**npm run start:dev**

La API se iniciará por defecto en http://localhost:3000.

# Para el front 

**ng serve**


### Documentación de la API (Swagger)
La documentación interactiva se genera automáticamente con Swagger. Una vez iniciado el servidor, accede a:

**http://localhost:3000/api/docs**
Aquí podrás ver y probar todos los endpoints disponibles, incluidos los protegidos con autenticación.

### Estructura del Proyecto
Una estructura de carpetas sugerida es:

 ``` 
nestjs-backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts      // Controlador de autenticación (login, etc.)
│   │   ├── auth.service.ts         // Lógica de autenticación y generación de JWT
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts   // Guard para proteger endpoints
│   │   │   └── local-auth.guard.ts // Guard para estrategia local
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts     // Estrategia para validar JWT
│   │   └── ...
│   ├── products/
│   │   ├── products.controller.ts  // Endpoints CRUD para productos
│   │   ├── products.service.ts     // Lógica de negocio para productos
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   └── ...
│   ├── users/
│   │   ├── users.module.ts         // Módulo de usuarios
│   │   ├── users.service.ts        // Lógica de usuarios
│   │   └── schemas/
│   │       └── user.schema.ts      // Esquema de usuario para MongoDB
│   ├── common/
│   │   └── middleware/
│   │       └── logging.middleware.ts // Middleware para depuración
│   ├── config/
│   │   └── database.config.ts      // Configuración de MongoDB
│   ├── app.module.ts               // Módulo raíz que importa los módulos
│   └── main.ts                     // Punto de entrada de la aplicación
├── .env                            // Variables de entorno
├── package.json
├── tsconfig.json
└── ...
 ```
## Notas Adicionales
CORS: La aplicación tiene habilitado CORS para permitir peticiones desde el frontend (por ejemplo, http://localhost:4200).
Middleware de Logging: Se utiliza un middleware para registrar las cabeceras de las peticiones y facilitar la depuración.

# Buenas Prácticas:

Separación de responsabilidades mediante módulos.
Uso de DTOs y validaciones con class-validator.
Protección de endpoints con JWT.

# Swagger y Documentación: 
La documentación se genera automáticamente y se puede acceder a través de Swagger UI en /api/docs.

### Ejemplo de Configuración de Middleware y Autenticación
Middleware de Logging
**typescript**

// src/common/middleware/logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('--- Cabeceras de la petición ---');
    console.log(req.headers);
    console.log('-------------------------------');
    next();
  }
}
Aplicación del Middleware en AppModule
typescript
Copiar código
// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.config';
import { RedisCacheModule } from './config/redis.config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RedisCacheModule,
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

### Configuración del JWT en el Backend

// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback_secret',
    });
  }

  async validate(payload: any) {
    console.log('Payload JWT:', payload);
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}

### Ejemplo de un Endpoint Protegido

// src/auth/auth.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    console.log('Header Authorization:', req.headers.authorization);
    console.log('Usuario autenticado:', req.user);
    return req.user;
  }
}

## GRACIAS
