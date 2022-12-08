const uniqid = require("uniqid");
const studentsSerice = require("../services/studentsService.js");
const classService = require("../services/classService.js");

const all = async (req, res) => {
  try {
    res.status(200).send(await studentsSerice.all());
  } catch (e) {
    console.error(e);
    res.status(404).send(e);
  }
};

const all_in_class = async (req, res) => {
  res.status(200).send( await studentsSerice.allInClass(req.params.id));
};

const add = async (req, res) => {
  const { body } = req;
  await studentsSerice.add({
    id: body.id, 
    firstName: body.firstName, 
    lastName: body.lastName, 
    age: body.age, 
    profession: body.profession, 
    classId: body.classId
  }).then(
  res.status(201).send("created new student succesfully!")).catch((e) => 
  res.status(205).send(`there was an error in adding the student sequlize Error: ${e}`));
};

const delete_by_id = async (req, res) => {
  const id = req.params.id
  const {dataValues} = await studentsSerice.getById(id); 
  const classId = dataValues.classId || null;

  if (classId) {
    const {dataValues} = await classService.getById(classId); 
    const currentCapacity = dataValues.currentCapacity;
    await classService.decreaseClassCount(classId, currentCapacity)
  await studentsSerice.delete_by_id(id).then(res.status(200).send("student deleted succefuly!"));
}
};

const add_to_class = async (req, res) => {
  const classId = req.body.classId;
  const studentId = req.params.id;
  const {dataValues} = await classService.getById(classId);
  const currentCapacity = dataValues.currentCapacity;
  const maxSeats = dataValues.maxSeats;

  if (currentCapacity < maxSeats) {
    await studentsSerice.addStudentToClass(studentId, classId).then(
        await classService.increaseClassCount(classId, currentCapacity)
      )
      .then(
        res.status(200).send("added to class " + classId + " succesfully!")
      );
  } else {
    res.status(304).send("The class is full!");
  }
};

const remove_form_class = async (req, res) => {
  const id = req.params.id
  const {dataValues} = await studentsSerice.getById(id);
  const classId = dataValues.classId
  const classData = await classService.getById(classId);
  const currentCapacity = classData.dataValues.currentCapacity;

  await studentsSerice.removeSingleStudentClass(id).then(
      await classService.decreaseClassCount(classId, currentCapacity)
    )
    .then(res.status(200).send("updated students connection"));
};

module.exports = {
  all,
  all_in_class,
  add,
  remove_form_class,
  delete_by_id,
  add_to_class,
};
