const { Op } = require("sequelize");

const {
  models: { Students },
} = require("../models");

const all = () => {
  return Students.findAll();
};

const allInClass = (id) => {
  return Students.findAll({
    where: { classId: id }})
}

const allInAllClasses = () => {
  return Students.findAll({
    where: {classId: {[Op.not]: null}}
  })
}

const add = ({id, firstName, lastName, age, profession, classId}) => {
  return  Students.create({
    id: id || uniqid.time(),
    firstName: firstName,
    lastName: lastName,
    age: age,
    profession: profession,
    classId: classId || null,
  });
}

const getById = (id) => {
  return Students.findByPk(id)
}

const addStudentToClass = (id, classId) => {
  return Students.update(
    {
      classId: classId,
    },
    {
      where: { id: id },
    }
  )
}

const removeStudentsClass = (classId) => {
  return  Students.update(
    {
      classId: null,
    },
    {
      where: { classId: classId },
    }
  )
}

const removeSingleStudentClass = (id) => {
  return  Students.update(
    {
      classId: null,
    },
    {
      where: { id: id },
    }
  )
}

const delete_by_id = (id) => {
  return Students.destroy({
    where: { id: id },
  })
}

module.exports = {
  all,
  allInClass,
  allInAllClasses,
  add,
  getById,
  delete_by_id,
  removeStudentsClass,
  removeSingleStudentClass,
  addStudentToClass
};
