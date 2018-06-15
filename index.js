'use strict';

/*
* CSVParser
* @module js-csv-parser
*/
class CSVParser{
  /*
  * Constructor
  * @param {Object} [options={ delimiter: ',', lineBreak: '\r\n', useHeaders: false }] - Object of options.
  */
  constructor(options = { delimiter, lineBreak, useHeaders } = { delimiter: ',', lineBreak: '\r\n', useHeaders: false }){
    this.delimiter = options['delimiter'];
    this.lineBreak = options['lineBreak'];
    this.useHeaders = options['useHeaders'];
  }

  /*
  * Parse CSV to Array of Objects.
  * @param {string} input - CSV String to be parsed.
  * @return {Array} parsedObjects - Array of parsed Objects.
  */
  parse(input){
    // Split input-string into lines, using lineBreak
    let lines = input.split(this.lineBreak);
    let inputHeaders = null;

    if(this.useHeaders){
      // Splice first line as headers
      inputHeaders = lines.splice(0, 1)[0].split(this.delimiter);
    }

    let parsedObjects = [];

    // For each index of lines
    for(let i in lines){
      // Define lineData by splitting line with delimiter
      let lineData = lines[i].split(this.delimiter);
      // Skip empty lines
      if(lines[i] != ''){
        let lineObj = {};
        // If using headers, headers will be set
        if(inputHeaders != null){
          // For each index of inputHeaders
          for(let j in inputHeaders){
            // Set key as header and value as either string or Number
            lineObj[inputHeaders[j]] = this.getTypePotential(lineData[j]);
          }
        }
        // If not using headers, use index instead of string as key
        else{
          // For each index of lineData
          for(let j in lineData){
            // Set key as index and value as either string or Number
            lineObj[j] = this.getTypePotential(lineData[j]);
          }
        }

        // Push Object to parsedObjects-array
        parsedObjects.push(lineObj);
      }
    }

    return parsedObjects;
  }

  /*
  * Detect if string is a Number, returns a Number if possible
  * @param {string} str
  * @returns {string | Number}
  */
  getTypePotential(str){
    if(Number.isNaN(Number(str))){
      return str;
    }
    else{
      return Number(str);
    }
  }
}

module.exports = CSVParser;
