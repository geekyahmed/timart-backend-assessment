import { Table, Column, DataType, AllowNull, Model, IsAlpha, IsEmail } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: false
})
export class User extends Model<User> {
    @AllowNull(false)
    @IsAlpha
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    username: string;

    @IsEmail
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    email: string;
}