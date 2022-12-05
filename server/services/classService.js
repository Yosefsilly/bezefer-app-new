const {
  models: { Students },
} = require("../models");

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

const getIsExist = async (classId) => {
  const id = await Classes.findByPk(classId);
  return id;
};

const delete_by_id = async (classId) => {
  await Students.update(
    {
      classId: null,
    },
    {
      where: { classId: classId },
    }
  ).then(
    await Classes.destroy({
      where: { classId: classId },
    })
  );
};

module.exports = {
  all,
  add,
  getIsExist,
  delete_by_id,
};

const __randomNumber = () => {
  return Math.floor(Math.random() * 100000);
};
