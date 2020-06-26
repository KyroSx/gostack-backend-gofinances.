import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

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
    category: category_title,
  }: Request): Promise<Transaction> {
    const allowedTypes = ['income', 'outcome'];

    if (!allowedTypes.includes(type))
      throw new AppError('The type does not exists');

    if (value <= 0) throw new AppError('The value can not be less then zero');

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type === 'outcome') {
      const { total } = await transactionsRepository.getBalance();

      if (value > total) throw new AppError('You do not have enough balance');
    }

    const categoryRepository = getRepository(Category);

    const categoryObject = { title: category_title };

    const existsCategoryInDatabase = await categoryRepository.findOne({
      where: categoryObject,
    });

    const category =
      existsCategoryInDatabase || categoryRepository.create(categoryObject);
    await categoryRepository.save(category);

    const transactionCreated = transactionsRepository.create({
      title,
      type,
      value,
      category,
    });
    await transactionsRepository.save(transactionCreated);

    console.log(transactionCreated);

    return transactionCreated;
  }
}

export default CreateTransactionService;
