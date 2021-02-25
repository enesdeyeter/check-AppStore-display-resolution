var sizeOf = require('image-size');


const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'images');

var uploadXR = 0;
var uploadOther = 0;

var XR_width = 1242;
var XR_height = 2688;

var other_width = 1242;
var other_height = 2208;

var arrXR = [];
var arrOther = [];

const { promisify } = require('util');
const { resolve } = require('path');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}
    

getFiles("iPhone_XR")
        .then(files => {
            console.log("dosylar: ");
            console.log(files);

            files.forEach(function (file) {
                    
                var image = sizeOf(file);
                //console.log(file + " dosyanın genişliği: " +image.width + " yüksekliği: " + image.height);  
            });
        })
        .catch(e => console.error(e));

        