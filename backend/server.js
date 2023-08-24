const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./models/user');
const Transaction = require('./models/transaction');

const typeDefs = gql`
  type Query {
    hello: String
    transactions(userId: ID!): [Transaction]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthData!
    logIn(email: String!, password: String!): AuthData!
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  type Transaction {
    id: ID!
    description: String!
    amount: Float!
    date: String!
    type: String!
}

type Mutation {
    createTransaction(userId: ID!, description: String!, amount: Float!, type: String!): Transaction
    updateTransaction(id: ID!, description: String, amount: Float, type: String): Transaction
    deleteTransaction(id: ID!): ID
}
`;


const resolvers = {
    Query: {
        hello: () => "Hello, Neo Wallet!",
        transactions: async (_, { userId }) => { 
            return await Transaction.find({ userId });
        }
    },
    Mutation: {
        signUp: async (_, { username, email, password }) => {
            let user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            user = new User({
                username,
                email,
                password: hashedPassword
            });

            await user.save();

            const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

            return { userId: user.id, token };
        },
        logIn: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

            return { userId: user.id, token };
        },
        createTransaction: async (_, { userId, description, amount, type }) => {
            const transaction = new Transaction({
                userId,
                description,
                amount,
                type
            });

            await transaction.save();
            return transaction;
        },

        updateTransaction: async (_, { id, description, amount, type }) => {
            const transaction = await Transaction.findById(id);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            if (description) transaction.description = description;
            if (amount) transaction.amount = amount;
            if (type) transaction.type = type;

            await transaction.save();
            return transaction;
        },

        deleteTransaction: async (_, { id }) => {
            const transaction = await Transaction.findById(id);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            await transaction.deleteOne();
            return id;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

connectDB();