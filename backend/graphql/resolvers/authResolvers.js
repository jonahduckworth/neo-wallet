const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server');

const authResolvers = {
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
    },
};

module.exports = authResolvers;
