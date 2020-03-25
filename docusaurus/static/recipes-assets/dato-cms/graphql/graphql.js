import { introspectSchema, makeRemoteExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-micro';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const http = new HttpLink({
    uri: 'https://graphql.datocms.com/',
    fetch,
});

const link = setContext(() => ({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.DATOCMS_TOKEN}`,
    },
})).concat(http);

let schema = {};

const getSchema = async () => {
    try {
        schema = await introspectSchema(link);
    } catch (error) {
        console.log(error);
    }

    const executableSchema = makeRemoteExecutableSchema({
        schema,
        link,
    });

    return executableSchema;
};

const apolloServer = new ApolloServer({
    schema: getSchema(),
    introspection: true,
    playground: {
        settings: {
            'schema.polling.enable': false,
        },
    },
});

export default apolloServer.createHandler({ path: '/api/graphql' });
