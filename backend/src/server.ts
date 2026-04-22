import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { extractUser } from './middleware/auth';

const PORT = parseInt(process.env.PORT ?? '3000', 10);
const SKIP_AUTH = process.env.SKIP_AUTH === 'true';

async function bootstrap() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      const user = extractUser(req);
      return { user };
    },
  });

  console.log(`🚀 Servidor rodando em ${url}`);
  console.log(`📊 GraphQL Playground: ${url}`);
  if (SKIP_AUTH) {
    console.log('⚠️  SKIP_AUTH=true — autenticação desabilitada (apenas para testes)');
  }
}

bootstrap().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});
