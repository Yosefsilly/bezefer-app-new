const classService = require("../services/classService.js");

const all = async (req, res) => {
  try {
    res.status(200).send(await classService.all());
  } catch (e) {
    console.error(e);
    res.status(404).send(e);
  }
};

const add = (req, res) => {
  const { body } = req;
  try {
    res.status(201).send(
      classService.add({
        name: body.name,
        maxSeats: body.maxSeats,
        classId: body.classId,
      })
    );
  } catch {
    res.status(405).send("id is not unique or other problem...");
  }
};

const isIdExist = async (req, res) => {
  await classService
    .getIsExist(req.params.id)
    .then((data) => {
      data ? res.status(200).send(true) : res.status(200).send(false);
    })
    .catch((e) => {
      res.send(e);
    });
};

const delete_by_id = async (req, res) => {
  const classId = req.params.id;
  await classService
    .delete_by_id(classId)
    .then(res.status(204).send("deleted class succesfully"))
    .catch((e) => {
      res.send(e);
    });
};

module.exports = {
  all,
  add,
  delete_by_id,
  isIdExist,
};
