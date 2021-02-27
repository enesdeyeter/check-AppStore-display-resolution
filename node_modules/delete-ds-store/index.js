#! /usr/bin/env node
var shell = require('shelljs');
var colors = require('colors');
var emoji = require('node-emoji');

var FIND_DS_STORE_COMMAND = 'find . -name "*.DS_Store"';
var DELETE_DS_STORE_COMMAND = FIND_DS_STORE_COMMAND + ' -type f -delete';
var COUNT_DS_STORE_COMMAND = FIND_DS_STORE_COMMAND + ' | wc -l';

console.log();
console.log(emoji.emojify(':rocket:  Deleting all .DS_Stores recursively...'.yellow));

// Count DS_Stores to be deleted
var count = shell.exec(COUNT_DS_STORE_COMMAND, { silent: true });

// Delete DS_Stores
shell.exec(DELETE_DS_STORE_COMMAND);

console.log(emoji.emojify(':fire:  ' + Number(count) + ' DS_Stores deleted').green);
console.log(emoji.emojify(':sparkles:  Done!'));