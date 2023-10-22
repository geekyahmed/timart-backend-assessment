import { Order, User } from "../../models";
import { OrderInterface, UserInterface } from "../../interfaces"
import { GraphQLError } from "graphql";

export const resolvers = {
    Query: {
        users: async () => {
            return User.findAll({
                attributes: ['id', 'username', 'email']
            })
        },
        user: async (_, args) => {
            const user = User.findOne({
                where: {
                    id: args.user_id
                },
                attributes: ['id', 'username', 'email']
            });

            if (!user)
                throw new GraphQLError("User bearing this id does not exist", {
                    extensions: {
                        code: 'USER_NOT_FOUND'
                    }
                })

            return user
        },
        userOrders: async (_, args) => {
            return Order.findAll({
                where: {
                    user_id: args.user_id
                },
                include: 'User'
            });
        },
    },
    Mutation: {
        createUser: async (_, { username, email }: UserInterface) => {
            const emailExists = await User.findOne({ where: { email } })

            if (emailExists)
                throw new GraphQLError("Email already exists! Try another email", {
                    extensions: {
                        code: 'EMAIL_ALREADY_EXISTS'
                    }
                })

            return User.create({ username, email } as User);
        },
        createOrder: async (_, { name, user_id, total_amount, order_date }: OrderInterface) => {
            const user = await User.findByPk(user_id)

            if (!user)
                throw new GraphQLError("User bearing this id does not exist", {
                    extensions: {
                        code: 'USER_NOT_FOUND'
                    }
                })
                
            return Order.create({ name, user_id, total_amount, order_date: new Date(order_date) } as Order);
        },
    },
};

