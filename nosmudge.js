#!/usr/bin/env node

var commander = require('commander');
var package = require('./package.json');
var jpeg = require('jpeg-js');
var fs = require('fs');
var path = require('path');

commander
    .version(package.version)
    .usage('[options] <file>')
    .option('-t, --threshold [threshold]', 'Color threshold. Everything above will be removed. (0-255)', 100)
    .option('-o, --output [filename]', 'Output filename. (default: filename_nosmudge.jpg)')
    .parse(process.argv);

if (commander.args.length < 1) {
    commander.outputHelp();
    process.exit(0);
}

var fileName = commander.args[0];
var threshold = commander.threshold;
var outname = path.join(path.dirname(fileName), path.basename(fileName, path.extname(fileName)) + '_nosmudge' + path.extname(fileName));
outname = commander.output ? commander.output : outname;

console.log("Creating image with threshold " + threshold + ". Output: " + outname);

var img = jpeg.decode(fs.readFileSync(fileName));

var changed = 0;

for (var i = 0; i < img.data.length; i += 4) {
    var val = 255;
    if (img.data[i] <= threshold) val = img.data[i];
    else changed++;

    img.data[i] = val;
    img.data[i+1] = val;
    img.data[i+2] = val;
}

var encoded = jpeg.encode(img, 50);

console.log("Changed " + changed + "/" + img.data.length + " pixels");

fs.writeFileSync(outname, encoded.data);
