import fs from 'fs'
import csvParser from 'csv-parser'

export default function convertCsvToJson<T>(filename: string, destinationPath: string): Promise<T[]> {
  const results: T[] = [] // Create an empty array to store the parsed data

  // Create a Promise that will resolve when the CSV parsing is complete
  return new Promise((resolve, reject) => {
    // Read the CSV file and pipe the contents through the csv-parser
    fs.createReadStream(filename)
      .pipe(csvParser())
      .on('data', (row: T) => {
        // When a row of data is parsed, push it into the results array
        results.push(row)
      })
      .on('end', () => {
        // When the CSV parsing is complete, resolve the Promise with the results array
        // Write the results array as JSON to the destination file
        fs.writeFile(destinationPath, JSON.stringify(results, null, 2), (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
      })
      .on('error', (err) => {
        // If there's an error during the parsing, reject the Promise with the error
        reject(err)
      })
  })
}
