const { ApolloServer } = require('apollo-server');
const {typeDefs} = require('./schema');
const { Query } = require('./resolvers/Query')
const { Product } = require('./resolvers/Product')
const { Category } = require('./resolvers/Category')
const { Mutation } = require('./resolvers/Mutation')
const { pool } = require('./db')
const { GraphQLScalarType } = require('graphql');
const moment = require('moment');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    let formatedDate = moment(value).utc().format('YYYY-MM-DD')
    return formatedDate;
  },
})

const server = new ApolloServer({
  typeDefs,
  resolvers:{
    Date: dateScalar,
    Query,
    Mutation,
    Product,
    Category
  },
  context: {
      pool
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});