'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.removeColumn('user_histories', 'time');

    queryInterface.addColumn(
      'user_histories',
      'time',
      Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('user_histories', 'time');

    queryInterface.addColumn(
      'user_histories',
      'time',
      Sequelize.DATEONLY
    );
  }
};
