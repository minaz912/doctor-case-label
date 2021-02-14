import * as parse from 'csv-parse';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

(() => {
  const inputFilePath = join(__dirname, 'conditions.csv');
  const outputFilePath = join(__dirname, 'conditions.json');
  const data = readFileSync(inputFilePath);

  const output = [];

  const parser = parse(data, {
    delimiter: '\t',
    from: 2,
    columns: ['code', 'description'],
  });

  // Use the readable stream api
  parser.on('readable', () => {
    let record;
    while ((record = parser.read())) {
      output.push(record);
    }
  });

  parser.on('error', (err) => {
    console.error(err);
  });

  parser.on('end', () => {
    writeFileSync(outputFilePath, JSON.stringify(output, null, 2));
  });
})();
