const fs = require('fs/promises');
const path = require('path');
const fileInformation = async () => {
  const dirPath = path.join(__dirname, 'secret-folder');
  const readDir = await fs.readdir(dirPath, {
    withFileTypes: true,
  });
  readDir.forEach(async (file) => {
    if (file.isFile()) {
      const filePath = path.join(dirPath, file.name);
      const info = await fs.stat(filePath);
      const extension = path.extname(file.name).slice(1);
      const name = path.basename(file.name, `.${extension}`);
      console.log(`
      ${name} - ${extension} - ${(info.size / 1024).toFixed(3)}kb`);
    }
  });
};
fileInformation();
