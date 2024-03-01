// const data = require("./data");
const data = require("./data2");
const utils = require('./utils');

const { textToMp3 } = utils;

const isTasks = typeof data[0] === "object" ? true : false;

if (isTasks) {
  data.forEach((task) => textToMp3(task.name));
  utils.createCSVFile(data);
} else {
  data.forEach((name) => textToMp3(name));
  utils.createSQLFile(data);
}
