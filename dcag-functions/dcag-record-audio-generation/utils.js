var txtomp3 = require("text-to-mp3");
const fs = require("fs");

Object.getPrototypeOf(txtomp3).attributes = {
  ie: "UTF-8",
  client: "tw-ob",
  // tl : "It-it"
  tl: "en-IN",
};

function textToMp3(name) {
  txtomp3.getMp3(name, function (err, binaryStream) {
    const fileName = formatName(name);

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

function createSQLFile(names) {
  const sqlfile = "tasks.sql";
  names.forEach((name) => {
    fs.writeFile(
      sqlfile,
      `INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('${name}', 'AUDIO_TO_AUDIO', 3, '${formatName(
        name
      )}.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');\n`,
      { flag: "a+" },
      (err) => {}
    );
  });
}

function createCSVFile(tasks) {
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

module.exports = { textToMp3, formatName, createSQLFile, createCSVFile };
