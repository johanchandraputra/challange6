'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user_game_biodata', 'user_biodata');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user_biodata', 'user_game_biodata');
  }
};
