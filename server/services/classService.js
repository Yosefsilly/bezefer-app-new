const students = require("../models/students/students");

const {
  models: { Classes },
} = require("../models");

const all = async () => {
  return await Classes.findAll();
};

const add = async ({ name, maxSeats, classId }) => {
  await Classes.create({
    name: name,
    maxSeats: maxSeats,
    classId: classId || __randomNumber(),
    currentCapacity: 0,
  });
};

const decreaseClassCount = async (classId, currentCapacity) => {
  return await Classes.update(
    {
      currentCapacity: currentCapacity - 1,
    },
    {
      where: { classId: classId },
    }
  );
}

const increaseClassCount = async (classId, currentCapacity) => {
  return await Classes.update(
    {
      currentCapacity: currentCapacity + 1,
    },
    {
      where: { classId: classId },
    }
  );
}

const getById = async (classId) => { // redundent
  return await Classes.findByPk(classId) 
}

const getIsExist = async (classId) => {
  return await Classes.findByPk(classId);
};

const delete_by_id = async (classId) => {
 return await Classes.destroy({
      where: { classId: classId },
    }
)
};

module.exports = {
  all,
  add,
  getIsExist,
  delete_by_id,
  getById,
  decreaseClassCount,
  increaseClassCount
};

const __randomNumber = () => {
  return Math.floor(Math.random() * 100000);
};
