# Veja a versão em Português <a href="README-ptbr.md">aqui</a>

# BumbleBuild - BackEnd

### Folder Structure 📁

    /src  
    ├── /config         # Global configuration (database, auth, env variables)  
    ├── /controllers    # Route controllers (handling incoming requests)  
    ├── /middlewares    # Middleware functions (auth, error handling, validations)  
    ├── /models         # Data models and DTOs  
    ├── /prisma         # Prisma ORM config and generated files  
    ├── /repositories   # Data access layer (queries, database interactions)  
    ├── /routes         # API route definitions and grouping  
    ├── /services       # Business logic and domain operations  
    ├── /utils          # Utility functions and reusable logic  
    ├── app.ts          # Main Express application configuration  
    ├── server.ts       # Entry point to start the server  
    ├── test.ts         # Temporary or manual test execution  
    /tests              # Unit and integration test files  
    /types/express      # Express type extensions and declarations  
    /uploads            # File upload directory (e.g., profile images)  
    .dockerignore       # Files/folders ignored during Docker builds  
    .env.example        # Example environment variable file  
    .gitignore          # Git ignored files/folders  
    Dockerfile          # Docker config for development  
    Dockerfile.prod     # Docker config for production  
    entrypoint.sh       # Shell script for container initialization  
    jest.config.js      # Jest testing framework configuration  
    package.json        # Project dependencies and scripts  
    swagger-output.json # Auto-generated Swagger API documentation  
    tsconfig.json       # TypeScript compiler configuration  