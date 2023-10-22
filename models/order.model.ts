import { Table, Column, DataType, AllowNull, Model, ForeignKey, IsNumeric, IsAlpha, IsAlphanumeric } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
    tableName: 'orders',
    timestamps: false,
    underscored: true
})
export class Order extends Model<Order> {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
    })
    order_date: Date;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    total_amount: number;
}