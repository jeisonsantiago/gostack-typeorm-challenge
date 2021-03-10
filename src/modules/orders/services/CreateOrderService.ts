import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    private ordersRepository: IOrdersRepository,
    private productsRepository: IProductsRepository,
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    // TODO

    // find customer ID
    const customer = this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    // check products availability



    // check all products existence and quantity
  }
}

export default CreateOrderService;
