module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('program', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            universityId: {
                allowNull: false,
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
                field: 'university_id',
                references: {
                    model: 'university',
                    key: 'id'
                }
            },
            description: Sequelize.STRING,
            commentGroupId: {
                allowNull: false,
                onUpdate: 'cascade',
                type: Sequelize.INTEGER,
                field: 'comment_group_id',
                references: {
                    model: 'comment_group',
                    key: 'id'
                }
            },
            category: Sequelize.STRING,
            links: Sequelize.ARRAY(Sequelize.STRING),
            specializations: Sequelize.ARRAY(Sequelize.STRING),
            duration: Sequelize.INTEGER,
            employment: Sequelize.FLOAT,
            salary: Sequelize.INTEGER,
            extraExam: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                field: 'extra_exam'
            },
            discount: Sequelize.BOOLEAN,
            createdAt: {
                field: 'created_at',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'updated_at',
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('program');
    }
};
