import fs from 'fs'
import csvParser from 'csv-parser'

// Define an interface to represent the structure of the CSV data
interface CsvData {
  Name: string
  Age: number
  Department: string
  Salary: number
}

export function convertCsvToTxt<T extends CsvData>(filename: string) {
  let textData = ''

  fs.createReadStream(filename)
    .pipe(csvParser())
    .on('data', (row: T) => {
      // Assuming the CSV has 'Name', 'Age', 'Department', and 'Salary' columns
      const { Name, Age, Department, Salary } = row
      textData += `Name: ${Name}, Age: ${Age}, Department: ${Department}, Salary: ${Salary}\n`
    })
    .on('end', () => {
      fs.writeFile('data.txt', textData, (err) => {
        if (err) {
          console.error('Error writing data to file:', err)
        } else {
          console.log('Data has been successfully written to "data.txt"')
        }
      })
    })
    .on('error', (err) => {
      console.error('Error converting CSV to TXT:', err)
    })
}

// Usage: node csvToTxt.js data.csv
const args = process.argv.slice(2)
const csvFilename = args[0]

if (!csvFilename) {
  console.error('Please provide the CSV filename as an argument.')
  console.log('Usage: node csvToTxt.js data.csv')
} else {
  convertCsvToTxt<CsvData>(csvFilename)
}
