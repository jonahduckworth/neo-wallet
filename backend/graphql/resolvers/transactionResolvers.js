const Transaction = require('../../models/transaction');

const transactionResolvers = {
    Query: {
      transactions: async (_, { userId }) => { 
        return await Transaction.find({ userId });
      },
    },
    Mutation: {
      addTransaction: async (_, { userId, description, amount, type, date }) => {
        const transaction = new Transaction({
          userId,
          description,
          amount,
          type,
          date,
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
      },
    },
};

module.exports = transactionResolvers;
