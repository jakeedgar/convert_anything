// Import required modules
import fs from 'fs' // File system module to read and write files
import csvParser from 'csv-parser' // CSV parser module to parse CSV data

// Define a function to convert CSV to JSON with type inference using generics
export default function convertCsvToJson<T>(filename: string): Promise<T[]> {
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
        resolve(results)
      })
      .on('error', (err) => {
        // If there's an error during the parsing, reject the Promise with the error
        reject(err)
      })
  })
}
