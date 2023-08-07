import fs from 'fs'
import path from 'path'
import readline from 'readline'
import convertCsvToJson from './convertors/csvToJson'
import convertCsvToTxt from './convertors/csvToText'
import promptForFormatAndPath from './utility/writeFile'

// Usage example
promptForFormatAndPath((format, csvPath, fileDestination) => {
  console.log('Desired Output Format:', format)
  console.log('CSV File Path:', csvPath)
  console.log('Destination File Path:', fileDestination)

  // Here, you can perform further actions based on the user input.
  // For example, you can call your CSV to JSON or CSV to TXT conversion functions
  // and use the provided paths (csvPath and fileDestination) accordingly.

  // Assuming you have functions named convertCsvToJson and convertCsvToTxt
  // that handle the conversion, you can use them like this:

  if (format === 'json') {
    convertCsvToJson(csvPath, fileDestination)
  } else if (format === 'txt') {
    convertCsvToTxt(csvPath, fileDestination)
  }
})
