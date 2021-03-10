import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product =  this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name: name,
      }
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // let findProducts: Product[] = [];
    // findProducts = await this.ormRepository.find({relations:['id']});

    // get all ids from argument
    const productsIDs = products.map(product=>product.id);

    const findProducts = await this.ormRepository.find({
      where: {
        id: In(productsIDs),
      }
    });

    return findProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {

    // since you are updating all in once,
    // you just need to save it all (require compatible format)
    return this.ormRepository.save(products);

    //TODO try new method after all done!!!
  }
}

export default ProductsRepository;
