import convertCsvToJson from './convertors/csvToJson'
import convertCsvToTxt from './convertors/csvToText'
import promptForFormatAndPath from './utility/writeFile'
import convertCsvToRtf from './convertors/csvToRichText'

promptForFormatAndPath((format, csvPath, fileDestination) => {
  console.log('Desired Output Format:', format)
  console.log('CSV File Path:', csvPath)
  console.log('Destination File Path:', fileDestination)

  if (format === 'json') {
    convertCsvToJson(csvPath, fileDestination)
  } else if (format === 'txt') {
    convertCsvToTxt(csvPath, fileDestination)
  } else if (format === 'rtf') {
    convertCsvToRtf(csvPath, fileDestination)
  }
})
