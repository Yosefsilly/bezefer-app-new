const {
  models: { Classes },
} = require("../models");

const {
  models: { Students },
} = require("../models");

const all = async (req, res) => {
  res.send(await Classes.findAll());
};

const add = async (req, res) => {
  res.status(201).send(
    await Classes.create({
      classId: __randomNumber(),
      name: req.body.name,
      maxSeats: req.body.maxSeats,
      currentCapacity: 0,
    })
  );
};

const get_by_id = async (req, res) => {
  res.send(await Classes.findByPk(req.params.id));
};

const delete_by_id = async (req, res) => {
  const classId = req.params.id;
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
    }).then(res.status(204).send("deleted class succesfullt"))
  );
};

module.exports = {
  all,
  add,
  get_by_id,
  delete_by_id,
};

const __randomNumber = () => {
  return Math.floor(Math.random() * 100000);
};
