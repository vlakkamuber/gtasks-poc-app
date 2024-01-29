const txtomp3 = require("text-to-mp3");
const fs = require("fs");
const names = require("./data");

txtomp3.attributes = {
  ie: "UTF-8",
  client: "tw-ob",
  // tl : "It-it"
  tl: "en-IN",
};

function textToMp3(name) {
  const fileName = formatName(name);
  return txtomp3.saveMP3(name, `${fileName}.mp3`);
}

function formatName(inputName) {
  const nameWithUnderscores = inputName.replace(/ /g, "_");
  const lowercaseName = nameWithUnderscores.toLowerCase();

  return lowercaseName;
}


function createSQLFile() {
  const sqlfile = "tasks.sql";
  names.forEach((name) => {
    fs.writeFile(
      sqlfile,
      `INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('${name}', 'AUDIO_TO_AUDIO', 3, '${formatName(
        name
      )}.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');\n`,
      { flag: "a+" }, err => {}
    );
  });
}

(async () => await Promise.all(names.map((name) => textToMp3(name))))();
createSQLFile();
