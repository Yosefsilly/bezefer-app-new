const uniqid = require("uniqid");
const studentsSerice = require("../services/studentsService.js");

const all = async (req, res) => {
  try {
    res.status(200).send(await studentsSerice.all());
  } catch (e) {
    console.error(e);
    res.status(404).send(e);
  }
};

const all_in_class = async (req, res) => {
  res.status(200).send(
    await Students.findAll({
      where: { classId: req.params.id },
    })
  );
};

const add = async (req, res) => {
  await Students.create({
    id: req.body.id || uniqid.time(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    profession: req.body.profession,
    classId: req.body.classId || null,
  });
  res.status(201).send("created new student succesfully!");
};

const delete_by_id = async (req, res) => {
  const student = await Students.findAll({ where: { id: req.params.id } }); //switch to find and destruct datavalues
  const classId = student[0].dataValues.classId ? student[0].dataValues.classId : null;

  if (classId) {
    const classData = await Classes.findAll({ where: { classId: classId } }); //switch to find and destruct datavalues
    const currentCapacity = classData[0].dataValues.currentCapacity;
    await Classes.update(
      {
        currentCapacity: currentCapacity - 1,
      },
      {
        where: { classId: classId },
      }
    );
  }
  await Students.destroy({
    where: { id: req.params.id },
  }).then(res.status(200).send("student deleted succefuly!"));
};

const add_to_class = async (req, res) => {
  const classId = req.body.classId;
  const studentId = req.params.id;
  const classData = await Classes.findAll({ where: { classId: classId } });
  const currentCapacity = classData[0].dataValues.currentCapacity;
  const maxSeats = classData[0].dataValues.maxSeats;

  if (currentCapacity < maxSeats) {
    await Students.update(
      {
        classId: classId,
      },
      {
        where: { id: studentId },
      }
    )
      .then(
        await Classes.update(
          {
            currentCapacity: currentCapacity + 1,
          },
          {
            where: { classId: classId },
          }
        )
      )
      .then(
        res.status(200).send("added to class " + classId + " succesfully!")
      );
  } else {
    res.status(304).send("The class is full!");
  }
};

const remove_form_class = async (req, res) => {
  let studentData = await Students.findAll({ where: { id: req.params.id } });
  studentData = studentData[0].dataValues
  const id = studentData.id
  const classId = studentData.classId
  const classData = await Classes.findAll({ where: { classId: classId } });
  const currentCapacity = classData[0].dataValues.currentCapacity;

  await Students.update(
    {
      classId: null,
    },
    {
      where: { id: id },
    }
  )
    .then(
      await Classes.update(
        {
          currentCapacity: currentCapacity - 1,
        },
        {
          where: { classId: classId },
        }
      )
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
