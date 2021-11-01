'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user_games', 'users');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('users', 'user_games');
  }
};
