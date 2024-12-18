import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import {ApolloServer} from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startApolloServer = async () => {
  await server.start();
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  app.use(express.static(path.join(__dirname,'../../client/dist')));


  app.use(routes);

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
