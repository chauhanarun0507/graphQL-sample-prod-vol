const { gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String!
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    productionVolumeList(filter: ProductsFilterInput): productionVolumePayLoad!
    prodVolGroupByUnit(filter: ProdVolFilterInputForGroupByUnit): [productionVolGroupBy!]!
    prodVolByMonth: [prodVolByMonthData!]!
  }

  scalar Date

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
  }

  type CalculatedData {
    plantCount: Int!
    productionVolCount: Float!
    mdrCount: Int!
    plantLoadCount: Float!
    uniqueMdr: [Float]
  }

  type prodVolByMonthData {
    year: Int!
    month: Int!
    plant: String!
    unit: String!
    unitCount : Int!
    mdrCount: Int!
    prodVolCount: Float!
  }

  type productionVolGroupBy {
      plant: String!
      unit: String!
      unitCount : Int!
      mdrCount: Int!
      prodVolCount: Float!
  }
  type productionVolumePayLoad {
      calculatedDataVal: [CalculatedData!]!
      productionVolumeData: [productionVolumeData!]!
  }

  type productionVolumeData {
      id: ID!
      plant: String!
      unit: String!
      event_id: Int!
      event_desc: String!
      date: Date!
      plant_load: Float!
      mdr: Int!
      production_volume: Float!
  }

  type Category {
      id: ID!
      name: String!
      products: [Product!]!
  }

  type Product {
      id: ID!
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      onSale: Boolean!
      categoryId: ID!
      category: Category
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean! 
    categoryId: ID!
  }

  input UpdateProductInput {
    name: String
    description: String
    quantity: Int
    price: Float
    onSale: Boolean 
  }

  input ProductsFilterInput {
    plant: String
    startDate: Date
    endDate: Date
  }

  input ProdVolFilterInputForGroupByUnit {
    plant: String
    unit: String
    startDate: Date
    endDate: Date
  }
`;

module.exports = {typeDefs}