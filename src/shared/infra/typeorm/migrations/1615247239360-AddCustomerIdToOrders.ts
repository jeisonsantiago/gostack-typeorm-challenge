import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

// add inside the table 'orders' the foreign key customer_id (a new colum with the customer_id from table 'customers')
// this relation is (many to one)-> many orders -> one customer
export default class AddCustomerIdToOrders1615247239360 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    // create the colum
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // import the foreign key
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders','OrdersCustomer');
    await queryRunner.dropColumn('orders','customer_id');
  }

}
