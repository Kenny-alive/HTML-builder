const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const filePath = path.join(__dirname, 'textfile.txt');
const stream = fs.createWriteStream(filePath, {
  flags: 'a',
});
const read = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log('Welcome! Type "exit" to quit the program.');
read.on('line', (text) => {
  if (text.toLowerCase() === 'exit') {
    read.close();
    process.exit();
  } else {
    stream.write(text + '\n');
  }
});
read.on('close', () => {
  console.log('Goodbye!');
  process.exit();
});
