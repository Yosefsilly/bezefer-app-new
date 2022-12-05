const {
  models: { Students },
} = require("../models");

const {
  models: { Classes },
} = require("../models");

const all = async () => {
  return await Students.findAll();
};

module.exports = {
  all,
};
