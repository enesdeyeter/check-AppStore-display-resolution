var sizeOf = require('image-size');
const { promisify } = require('util');
const { resolve } = require('path');

//const path = require('path');
const fs = require('fs');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

var arrXR = [];
var arrPlus = [];
var arrFail = [];

var XR_width = 1242;
var XR_height = 2688;

var plus_width = 1242;
var plus_height = 2208;

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}
    

getFiles("images")
        .then(files => {
            files.forEach(function (file) {
                
                var image = sizeOf(file);
                //console.log(file + " width: " +image.width + " height: " + image.height);  

                //uploadPlus
                if( image.width<=plus_width && image.height<=plus_height ){
                    arrPlus.push(file);
                }
                //uploadXR
                else if( image.width<=XR_width && image.height<=XR_height ){
                    arrXR.push(file);
                }
                else{
                    arrFail.push(file+" -> "+image.width+"x"+image.height);
                  }
            });

        console.log("********************");
        console.log("-> there are "+arrXR.length+" photos to upload for iPhone XR / "+XR_width+"x"+XR_height);
        console.log(arrXR);
        console.log("------");
        console.log("-> there are "+arrPlus.length+" photos to upload for 8 Plus / "+plus_width+"x"+plus_height);
        console.log(arrPlus);
        console.log("------");
        console.log("-> There are "+arrFail.length+" photos with errors");
        console.log(arrFail);
        console.log("********************");
        })
        .catch(e => console.error(e));

        

        // delete-ds-store