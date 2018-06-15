'use strict';
const CSVParser = require('js-csv-parser');
const fs = require('fs');

let parserOptions = { delimiter: ',', lineBreak: '\r\n', useHeaders: true };
let parser = new CSVParser(parserOptions);

fs.readFile('data.csv', 'utf8', function(err, csvData) {
    if (err) throw err;
    console.log(parser.parse(csvData));
});
