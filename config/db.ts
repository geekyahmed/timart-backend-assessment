import { Sequelize } from 'sequelize-typescript';
import { Order, User } from '../models';

const sequelize = new Sequelize({
    host: 'localhost',
    database: 'tmart_db',
    username: 'root',
    password: 'depressed@2004',
    dialect: 'mysql',
    models: [User, Order]
});

User.hasMany(Order)
Order.belongsTo(User)

export { sequelize }