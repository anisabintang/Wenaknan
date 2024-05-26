const { Sequelize } = require('sequelize');

try {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    
    });

    module.exports = sequelize;
} catch (error) {
    console.error('Error creating Sequelize instance', error);
}
