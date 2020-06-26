import path from 'path';
import fs from 'fs';
import parse from 'csv-parse';
import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const filePath = path.join(uploadConfig.directory, filename);

    return {} as Transaction[];
  }
}

export default ImportTransactionsService;
