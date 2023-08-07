import fs from 'fs'

export default function convertTextFileToJson(inputFilePath: string, destinationPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.readFile(inputFilePath, 'utf-8', (readErr, prose) => {
      if (readErr) {
        reject(readErr)
        return
      }

      const sentences: string[] = prose.split(/(?<=[.!?])\s+/)

      const sentenceData = sentences.map((sentence, idx) => ({
        sentence_number: idx + 1,
        sentence
      }))

      fs.writeFile(destinationPath, JSON.stringify(sentenceData, null, 4), (writeErr) => {
        if (writeErr) {
          reject(writeErr)
        } else {
          resolve()
        }
      })
    })
  })
}
