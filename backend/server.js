const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./models/user');

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthData!
    logIn(email: String!, password: String!): AuthData!
  }

  type AuthData {
    userId: ID!
    token: String!
  }
`;


const resolvers = {
    Query: {
        hello: () => "Hello, Neo Wallet!"
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
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

connectDB();