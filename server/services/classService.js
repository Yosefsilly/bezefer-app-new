const students = require("../models/students/students");

const {
  models: { Classes },
} = require("../models");

const all = () => {
  return Classes.findAll();
};

const add = ({ name, maxSeats, classId }) => {
 Classes.create({
    name: name,
    maxSeats: maxSeats,
    classId: classId || __randomNumber(),
    currentCapacity: 0,
  });
};

const decreaseClassCount = (classId, currentCapacity) => {
  return Classes.update(
    {
      currentCapacity: currentCapacity - 1,
    },
    {
      where: { classId: classId },
    }
  );
}

const increaseClassCount = (classId, currentCapacity) => {
  return Classes.update(
    {
      currentCapacity: currentCapacity + 1,
    },
    {
      where: { classId: classId },
    }
  );
}

const getById = (classId) => { // redundent
  return Classes.findByPk(classId) 
}

const getIsExist = (classId) => {
  return Classes.findByPk(classId);
};

const delete_by_id = (classId) => {
 return Classes.destroy({
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
