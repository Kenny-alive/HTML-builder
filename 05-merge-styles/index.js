const fs = require('fs');
const path = require('path');

const pathToStyles = path.join(__dirname, 'styles');
const pathToProject = path.join(__dirname, 'project-dist');
const pathToBundle = path.join(pathToProject, 'bundle.css');

let cssInner = [];

fs.readdir(pathToProject, (err, files) => {
  files.forEach((file) => {
    if (file !== 'index.html') {
      fs.unlink(path.join(pathToProject, file), () => {
        null;
      });
    }
  });
});

fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
  files.forEach((item) => {
    const itemPath = path.join(pathToStyles, item.name);
    if (item.isFile() && path.extname(item.name) === '.css') {
      fs.readFile(itemPath, 'utf8', (err, data) => {
        cssInner.push(data);
        if (
          cssInner.length ===
          files.filter(
            (file) => file.isFile() && path.extname(file.name) === '.css',
          ).length
        ) {
          fs.writeFile(pathToBundle, cssInner.join('\n'), () => {
            null;
          });
        }
      });
    }
  });
});
