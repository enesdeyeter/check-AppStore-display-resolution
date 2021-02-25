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
var arr = [];

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
                console.log(file + " genişliği: " +image.width + " yüksekliği: " + image.height);  

                //uploadOther
                if( image.width<=other_width && image.height<=other_height ){
                    uploadXR++;
                    arrXR.push(file);
                }
                //uploadXR
                else if( image.width<=XR_width && image.height<=XR_height ){
                    uploadOther++;
                    arrOther.push(file);
                }
                else
                    arr.push(file);
            });

            console.log("------");
        console.log("8 Plus icin yuklenecek "+uploadOther+" fotograf var");
        console.log(arrXR);
        console.log("------");
        console.log("XR icin yuklenecek "+uploadXR+" fotograf var");
        console.log(arrOther);
        console.log("------");
        console.log("uyumsuz fotograflar");
        console.log(arr);

        })
        .catch(e => console.error(e));

        

        