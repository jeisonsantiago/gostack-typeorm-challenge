import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {

    try {
      const { name, price, quantity } = request.body;

      // get the singleton intance
      const createProductService = container.resolve(CreateProductService);

      const product = await createProductService.execute({
        name,
        price,
        quantity,
      });

      return response.json(product);
    } catch (error) {
      return response
        .status(400)
        .json({ error: error.message });
    }

  }
}
