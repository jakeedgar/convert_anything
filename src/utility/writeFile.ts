import readline from 'readline'
import fs from 'fs'
import { SupportedFileTypes } from '../../types/types'

// Define the utility function
export const promptForFormatAndPath = (callback: (format: SupportedFileTypes, csvPath: string, fileDestination: string) => void) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Enter the desired output file format (JSON, TXT, or RTF): ', (format) => {
    const lowercaseFormat = format.toLowerCase() as SupportedFileTypes

    if (lowercaseFormat === 'json' || lowercaseFormat === 'txt' || lowercaseFormat === 'rtf') {
      rl.question('Enter the CSV file path: ', (csvPath) => {
        if (fs.existsSync(csvPath)) {
          rl.question('Enter the destination file path: ', (fileDestination) => {
            callback(lowercaseFormat, csvPath, fileDestination)
            rl.close()
          })
        } else {
          console.error('CSV file not found.')
          rl.close()
        }
      })
    } else {
      console.error('Invalid format. Please enter "JSON", "TXT" or "RTF.')
      rl.close()
    }
  })
}

export default promptForFormatAndPath
