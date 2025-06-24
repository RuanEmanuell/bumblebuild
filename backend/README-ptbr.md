# Check the English version <a href="README.md">here</a>

# BumbleBuild - BackEnd

### Estrutura de Pastas 📁

    /src  
    ├── /config           # Configurações globais (banco, autenticação, variáveis)  
    ├── /controllers      # Controladores das rotas (lógica de entrada)  
    ├── /middlewares      # Middlewares (auth, tratamento de erros, validações)  
    ├── /models           # Definições dos modelos de dados (DTOs, interfaces)  
    ├── /prisma           # Arquivos gerados e configuração do Prisma ORM  
    ├── /repositories     # Camada de acesso ao banco (queries, persistência)  
    ├── /routes           # Definições e agrupamento das rotas da API  
    ├── /services         # Lógica de negócio, regras, processamentos  
    ├── /utils            # Funções auxiliares e helpers  
    ├── app.ts            # Instância e configuração principal da aplicação Express  
    ├── server.ts         # Arquivo que sobe o servidor (entrypoint)  
    ├── test.ts           # Arquivo para testes rápidos (pode conter testes temporários)  

    /tests                # Pasta dedicada a testes unitários e de integração  

    /types/express        # Tipagens adicionais/extensões do Express  

    /uploads              # Uploads de arquivos (ex.: imagens de perfil)  

    .dockerignore         # Arquivos/pastas ignorados no build Docker  
    .env.example          # Exemplo de variáveis de ambiente  
    .gitignore            # Arquivos ignorados pelo Git  
    Dockerfile            # Arquivo Docker para ambiente de desenvolvimento  
    Dockerfile.prod       # Arquivo Docker para ambiente de produção  
    entrypoint.sh         # Script de entrada para containers Docker  
    jest.config.js        # Configuração do Jest (testes)  
    package.json          # Dependências e scripts do projeto  
    swagger-output.json   # Documentação gerada das rotas (Swagger)  
    tsconfig.json         # Configuração do TypeScript  
