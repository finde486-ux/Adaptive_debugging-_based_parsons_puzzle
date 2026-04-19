const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const executePython = (code) => {
  return new Promise((resolve, reject) => {
    const filename = `temp_${uuidv4()}.py`;
    const filepath = path.join(__dirname, filename);

    fs.writeFileSync(filepath, code);

    exec(`python3 ${filepath}`, (error, stdout, stderr) => {
      fs.unlinkSync(filepath);
      if (error) {
        resolve({ stdout, stderr: stderr || error.message });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

module.exports = { executePython };
