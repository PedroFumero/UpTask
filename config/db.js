const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('uptask_node', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  define: {
    timestamps: false,
  },
})

// const hola = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

module.exports = sequelize
