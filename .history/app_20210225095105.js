var sizeOf = require('image-size');


const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'images');

var arrXR = [];
var arrPlus = [];
var arrError = [];

var uploadXR = 0;
var uploadPlus = 0;
var uploadOther = 0;

var XR_width = 1242;
var XR_height = 2688;

var Plus_width = 1242;
var Plus_height = 2208;

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

var isUnixHiddenPath = function (path) {
    return (/(^|\/)\.[^\/\.]/g).test(path);
};
    

getFiles("Exportlar")
        .then(files => {
            //console.log("dosylar: ");

            files.forEach(function (file) {
                
                var image = sizeOf(file);
                //console.log(file + " genişliği: " +image.width + " yüksekliği: " + image.height);  

                //uploadOther
                if( image.width<=plus_width && image.height<=plus_height ){
                    uploadPlus++;
                    arrPlus.push(file);
                    
                }
                //uploadXR
                else if( image.width<=XR_width && image.height<=XR_height ){
                    uploadXR++;
                    arrXR.push(file);
                }
                else{
                    uploadOther++;
                    arrError.push(file);
                }
            });

        console.log("------");
        console.log("8 Plus icin yuklenecek "+uploadPlus+" fotograf var");
        console.log(arrXR);
        console.log("------");
        console.log("XR icin yuklenecek "+uploadXR+" fotograf var");
        console.log(arrPlus);
        console.log("------");
        console.log("uyumsuz fotograflar"+uploadXR+" fotograf var");
        console.log(arr);

        })
        .catch(e => console.error(e));

        

        