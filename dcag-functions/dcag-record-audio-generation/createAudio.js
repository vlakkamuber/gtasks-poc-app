const txtomp3 = require("text-to-mp3");
const fs = require("fs");
const names = require('./data')

txtomp3.attributes = {
  ie: "UTF-8",
  client : "tw-ob",
  // tl : "It-it"
  tl : "en-IN"
};

function textToMp3(name) {
  const fileName = formatName(name);
  txtomp3.getMp3(name, function(err, binaryStream){
    if(err){
      console.log(err);
      return;
    }
    var file = fs.createWriteStream(`${fileName}.mp3`);
    file.write(binaryStream);
    file.end();
  });
}

function formatName(inputName) {
  const nameWithUnderscores = inputName.replace(/ /g, '_');
  const lowercaseName = nameWithUnderscores.toLowerCase();

  return lowercaseName;
}

names.forEach(name => textToMp3(name));
