var txtomp3 = require("text-to-mp3");
const fs = require("fs");
const tasks = require("./data2");

Object.getPrototypeOf(txtomp3).attributes = {
  ie: "UTF-8",
  client: "tw-ob",
  // tl : "It-it"
  tl: "en-IN",
};

function textToMp3(task) {
  txtomp3.getMp3(task.name, function (err, binaryStream) {
    const fileName = formatName(task.name);

    if (err) {
      console.log(err);
      return;
    }
    var file = fs.createWriteStream(`./output/${fileName}.mp3`); // write it down the file
    file.write(binaryStream);
    file.end();
  });
}

function formatName(inputName) {
  const nameWithUnderscores = inputName.replace(/ /g, "_");
  const lowercaseName = nameWithUnderscores.toLowerCase();

  return lowercaseName;
}

function createSQLFile() {
  const file = "tasks.csv";
  tasks.forEach((task) => {
    fs.writeFile(
      file,
      `${task.name},${formatName(task.name)}.mp3,${task.city}\n`,
      { flag: "a+" },
      (err) => {}
    );
  });
}
tasks.forEach((task) => textToMp3(task));
createSQLFile();
