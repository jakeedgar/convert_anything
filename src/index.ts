import fs from 'fs';
import path from 'path';
import readline from 'readline';
import csvParser from 'csv-parser';

// Define an interface to represent the structure of the CSV data
interface CsvData {
  Name: string;
  Type: string;
  HP: number;
  Attack: number;
  Defense: number;
  Speed: number;
}

// Function to convert CSV to JSON
function convertCsvToJson(filename: string, destPath: string) {
  const jsonData: CsvData[] = [];

  fs.createReadStream(filename)
    .pipe(csvParser())
    .on('data', (row: CsvData) => {
      jsonData.push(row);
    })
    .on('end', () => {
      fs.writeFile(destPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing data to file:', err);
        } else {
          console.log('Data has been successfully written to the destination file.');
        }
      });
    })
    .on('error', (err) => {
      console.error('Error converting CSV to JSON:', err);
    });
}

// Function to convert CSV to TXT
function convertCsvToTxt(filename: string, destPath: string) {
  let txtData = '';

  fs.createReadStream(filename)
    .pipe(csvParser())
    .on('data', (row: CsvData) => {
      txtData += `Name: ${row.Name}, Type: ${row.Type}, HP: ${row.HP}, Attack: ${row.Attack}, Defense: ${row.Defense}, Speed: ${row.Speed}\n`;
    })
    .on('end', () => {
      fs.writeFile(destPath, txtData, (err) => {
        if (err) {
          console.error('Error writing data to file:', err);
        } else {
          console.log('Data has been successfully written to the destination file.');
        }
      });
    })
    .on('error', (err) => {
      console.error('Error converting CSV to TXT:', err);
    });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the desired output file format (JSON or TXT): ', (format) => {
  if (format.toLowerCase() === 'json' || format.toLowerCase() === 'txt') {
    rl.question('Enter the CSV file path: ', (csvPath) => {
      if (fs.existsSync(csvPath)) {
        const csvFileName = path.basename(csvPath, path.extname(csvPath));
        const destPath = `${csvFileName}.${format.toLowerCase()}`;

        if (format.toLowerCase() === 'json') {
          convertCsvToJson(csvPath, destPath);
        } else if (format.toLowerCase() === 'txt') {
          convertCsvToTxt(csvPath, destPath);
        }
      } else {
        console.error('CSV file not found.');
      }
      rl.close();
    });
  } else {
    console.error('Invalid format. Please enter "JSON" or "TXT".');
    rl.close();
  }
});
