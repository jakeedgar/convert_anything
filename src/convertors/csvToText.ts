import fs from 'fs'
import csvParser from 'csv-parser'

// Define a function to convert CSV to TXT format
export default function convertCsvToTxt<T extends {}, K extends keyof T>(filename: string, destinationPath: string) {
  let columnNames: Array<T> = [] // Store the column names initially as null
  const readStream = fs.createReadStream(filename)
  const writeStream = fs.createWriteStream(destinationPath)

  readStream
    .pipe(csvParser())
    .on('headers', (headers: string[]) => {
      // Capture the column names when the 'headers' event is emitted
      columnNames = headers as any
    })
    .on('data', (row: T) => {
      if (columnNames !== null) {
        // Convert the unknown row data to a formatted string and write it to the destination file
        const formattedRow = Object.keys(row)
          .map((key, index) => `${columnNames[index]}: ${row[key as K]}`)
          .join(', ')

        writeStream.write(`${formattedRow}\n`)
      }
    })
    .on('end', () => {
      // When the CSV parsing is complete, close the write stream and log the success message
      writeStream.end()
      console.log(`Data has been successfully written to "${destinationPath}"`)
    })
    .on('error', (err) => {
      // If there's an error during the parsing, log the error message and close the write stream
      console.error('Error converting CSV to TXT:', err)
      writeStream.end()
    })
}
