'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(80)
      },
      publisher: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      developer: {
        allowNull: false,
        type: Sequelize.STRING(65)
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      overallRating: {
        type: Sequelize.DECIMAL(2, 1)
      },
      imageHref: {
        type: Sequelize.STRING(100),
        defaultValue: './images/not-found.png/'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Games');
  }
};
