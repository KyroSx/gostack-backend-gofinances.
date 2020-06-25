// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);

    const categoryCreated = categoryRepository.create({ title: category });
    await categoryRepository.save(categoryCreated);

    const transaction = {
      title,
      type,
      value,
      category: categoryCreated,
    };

    const transactionRepository = getCustomRepository(TransactionRepository);

    const transactionCreated = transactionRepository.create(transaction);
    await transactionRepository.save(transactionCreated);

    return transactionCreated;
  }
}

export default CreateTransactionService;
