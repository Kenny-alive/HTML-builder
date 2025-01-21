const fs = require('fs');
const path = require('path');

const copyFiles = async (source, destination) => {
  const stats = await fs.promises.stat(source);
  if (stats.isFile()) {
    const destDir = path.dirname(destination);
    await fs.promises.mkdir(destDir, { recursive: true });

    await fs.promises.copyFile(source, destination);
  }
};

const copyDir = async () => {
  const pathToDir = path.join(__dirname, 'files');
  const purposeDir = path.join(__dirname, 'files-copy');

  await fs.promises.mkdir(purposeDir, { recursive: true });

  const filesInSource = await fs.promises.readdir(pathToDir);
  const filesInDest = await fs.promises.readdir(purposeDir);

  for (const element of filesInSource) {
    const pathElement = path.join(pathToDir, element);
    const purposeElement = path.join(purposeDir, element);
    const info = await fs.promises.stat(pathElement);

    if (info.isDirectory()) {
      await copyDirRecurs(pathElement, purposeElement);
    } else {
      await copyFiles(pathElement, purposeElement);
    }
  }

  for (const element of filesInDest) {
    const purposeElement = path.join(purposeDir, element);
    if (!filesInSource.includes(element)) {
      await fs.promises.rm(purposeElement, { recursive: true, force: true });
    }
  }

  process.exit();
};

async function copyDirRecurs(pathToDir, purposeDir) {
  await fs.promises.mkdir(purposeDir, { recursive: true });
  const readDir = await fs.promises.readdir(pathToDir);

  for (const element of readDir) {
    const pathElement = path.join(pathToDir, element);
    const purposeElement = path.join(purposeDir, element);
    const info = await fs.promises.stat(pathElement);

    if (info.isDirectory()) {
      await copyDirRecurs(pathElement, purposeElement);
    } else {
      await copyFiles(pathElement, purposeElement);
    }
  }
}

copyDir();
