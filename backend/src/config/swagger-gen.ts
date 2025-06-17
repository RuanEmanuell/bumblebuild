import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'BumbleBuild API',
    description: 'Documentação da API do BumbleBuild',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = '../../swagger-output.json'; 
const endpointsFiles = ['./src/server.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
