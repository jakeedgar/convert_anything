import readline from 'readline'
import fs from 'fs'

// Define the utility function
export const promptForFormatAndPath = (callback: (format: 'json' | 'txt', csvPath: string, fileDestination: string) => void) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Enter the desired output file format (JSON or TXT): ', (format) => {
    const lowercaseFormat = format.toLowerCase() as 'json' | 'txt'

    if (lowercaseFormat === 'json' || lowercaseFormat === 'txt') {
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
      console.error('Invalid format. Please enter "JSON" or "TXT".')
      rl.close()
    }
  })
}

export default promptForFormatAndPath
