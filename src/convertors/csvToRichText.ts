import fs from 'fs'
import csvParser from 'csv-parser'

interface ColumnData {
  [key: string]: string
}

export default function convertCsvToRtf<T extends ColumnData, K extends keyof T>(filename: string, destinationPath: string) {
  let columnNames: string[] = [] // Store the column names initially as an empty array
  const readStream = fs.createReadStream(filename)
  const writeStream = fs.createWriteStream(destinationPath)

  // Write the RTF header
  writeStream.write('{\\rtf1\\ansi\\deff0\n')

  readStream
    .pipe(csvParser())
    .on('headers', (headers: string[]) => {
      // Capture the column names when the 'headers' event is emitted
      columnNames = headers
    })
    .on('data', (row: T) => {
      if (columnNames.length > 0) {
        // Convert the row data to a formatted RTF string and write it to the destination file
        const formattedRow = Object.keys(row)
          .map((key, index) => `\\b ${columnNames[index]}: \\b0 ${row[key as K]}\\par`)
          .join('')

        writeStream.write(formattedRow)
      }
    })
    .on('end', () => {
      // Write the RTF footer and close the write stream
      writeStream.write('}')
      writeStream.end()
      console.log(`Data has been successfully written to "${destinationPath}"`)
    })
    .on('error', (err) => {
      // If there's an error during the parsing, log the error message and close the write stream
      console.error('Error converting CSV to RTF:', err)
      writeStream.end()
    })
}
