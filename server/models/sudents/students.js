module.exports = (Sequelize, sequelize) => {
  const Students = sequelize.define("Students", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.STRING
    },
    profession: {
      type: Sequelize.STRING
    },
    classId: {
      type: Sequelize.STRING
    }
  });

  return Students;
};
