// Dependencies
import express from 'express'
import {ApolloServer, gql} from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import jwt from 'jsonwebtoken'
import {WebSocketServer} from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import {makeExecutableSchema} from '@graphql-tools/schema'

// create express
const app = express();

// schema
const schema = makeExecutableSchema({typeDefs, resolvers})

// context
const context = ({req})=> {
      const {authorization} = req.headers
      if(authorization){
        const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
        return {userId}
      }  
    }

// create apollo server
const apolloServer = new ApolloServer({schema,context})

// apply middleware
await apolloServer.start()
apolloServer.applyMiddleware({app, path: "/graphql"})

// create and use websocket server
const server = app.listen(4000, () => {
  const wsServer = new WebSocketServer({
    server,
    path: '/graphql'
  })

  useServer({schema}, wsServer)
  console.log("🚀 ApolloServer and Subscription server is up")
})


// const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   csrfPrevention: true,
  //   context: ({req})=> {
  //     const {authorization} = req.headers
  //     if(authorization){
  //       const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
  //       return {userId}
  //     }  
  //   }
  // });

  // // The `listen` method launches a web server.
  // server.listen().then(({ url }) => {
  //   console.log(`🚀  Server ready at ${url}`);
  // });