'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('user_biodata', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_biodata_user_id_fkey',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    queryInterface.addConstraint('user_histories', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_histories_user_id_fkey',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
  },

  down: async (queryInterface, Sequelize) => {
   queryInterface.removeConstraint('user_biodata','user_biodata_user_id_fkey');

   queryInterface.removeConstraint('user_histories','user_histories_user_id_fkey');
  }
};
