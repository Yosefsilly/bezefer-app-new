const {
  models: { Students },
} = require("../models");

const {
  models: { Classes },
} = require("../models");

const all = async () => {
  return await Students.findAll();
};

const allInClass = async (id) => {
  return await Students.findAll({
    where: { classId: id }})
}

const add = async ({id, firstName, lastName, age, profession, classId}) => {
  return (await Students.create({
    id: id || uniqid.time(),
    firstName: firstName,
    lastName: lastName,
    age: age,
    profession: profession,
    classId: classId || null,
  }));
}

const getById = async (id) => {
  return await Students.findByPk(id)
}

const addStudentToClass = async (id, classId) => {
  return await Students.update(
    {
      classId: classId,
    },
    {
      where: { id: id },
    }
  )
}

const removeStudentsClass = async (classId) => {
  return (await Students.update(
    {
      classId: null,
    },
    {
      where: { classId: classId },
    }
  ))
}

const removeSingleStudentClass = async (id) => {
  return await  Students.update(
    {
      classId: null,
    },
    {
      where: { id: id },
    }
  )
}

const delete_by_id = async (id) => {
  return await Students.destroy({
    where: { id: id },
  })
}

module.exports = {
  all,
  allInClass,
  add,
  getById,
  delete_by_id,
  removeStudentsClass,
  removeSingleStudentClass,
  addStudentToClass
};
