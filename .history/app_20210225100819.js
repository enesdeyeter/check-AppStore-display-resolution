var sizeOf = require('image-size');
const { promisify } = require('util');
const { resolve } = require('path');

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'images');

var arrXR = [];
var arrPlus = [];
var arrFail = [];

var uploadXR = 0;
var uploadPlus = 0;
var fail = 0;

var XR_width = 1242;
var XR_height = 2688;

var plus_width = 1242;
var plus_height = 2208;

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
    

getFiles("Exportlar")
        .then(files => {
            //console.log("dosylar: ");

            files.forEach(function (file) {
                
                var image = sizeOf(file);
                //console.log(file + " genişliği: " +image.width + " yüksekliği: " + image.height);  
                
                
                    var tarih = new Date();
                    var gun = tarih.getDay();
                    switch(sizeOf(file)) {
                      case image.width<=plus_width && image.height<=plus_height:
                        uploadPlus++;
                        arrPlus.push(file+" -> "+image.width+"x"+image.height);
                      break;
                      case image.width<=XR_width && image.height<=XR_height:
                        uploadXR++;
                        arrXR.push(file+" -> "+image.width+"x"+image.height);
                      break;
                    }
                  }




            });

        console.log("------");
        console.log("XR icin yuklenecek "+uploadXR+" fotograf var");
        console.log(arrXR);
        console.log("------");
        console.log("8 Plus icin yuklenecek "+uploadPlus+" fotograf var");
        console.log(arrPlus);
        console.log("------");
        console.log("uyumsuz "+fail+" fotograf var");
        console.log(arrFail);

        })
        .catch(e => console.error(e));

        

        // delete-ds-store