import fs from 'fs'

export default function convertJsonToCsv<T extends {}>(filename: string, destinationPath: string): Promise<void> {
  const jsonData: T[] = []

  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }

      try {
        jsonData.push(...JSON.parse(data))
      } catch (parseError) {
        reject(parseError)
        return
      }

      const keys = Object.keys(jsonData[0]) as (keyof T)[]

      const csvRows = jsonData.map((row) => keys.map((key) => row[key]).join(','))

      const csvContent = keys.join(',') + '\n' + csvRows.join('\n')

      fs.writeFile(destinationPath, csvContent, (writeErr) => {
        if (writeErr) {
          reject(writeErr)
        } else {
          resolve()
        }
      })
    })
  })
}
