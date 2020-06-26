import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    try {
      await transactionRepository.delete({ id });
    } catch {
      throw new AppError('This transaction-id doest not exits');
    }
  }
}

export default DeleteTransactionService;
