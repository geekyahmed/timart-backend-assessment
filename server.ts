import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema, resolvers } from './graphql';
import { sequelize } from './config';

const app = express();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError(error) {
        return { message: 'Internal server error', error }
    }
});

async function runApollo() {
    await server.start()

    server.applyMiddleware({ app });
}

runApollo()

const PORT = process.env.PORT || 7000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/graphql`);
        console.log('Database is also running')
    });
});
