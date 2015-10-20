module.exports = {
      up: function(queryInterface, Sequelize) {
        // logic for transforming into the new state
        return queryInterface.createTable('comment_group',
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            }
            })
      },
      down: function(queryInterface, Sequelize) {
        // logic for reverting the changes
        return queryInterface.dropTable('comment_group');
      }
  }
