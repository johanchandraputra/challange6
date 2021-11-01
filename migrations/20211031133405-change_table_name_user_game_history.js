'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user_game_histories', 'user_histories');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user_histories', 'user_game_histories');
  }
};
