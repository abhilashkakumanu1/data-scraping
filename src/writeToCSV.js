import { stringify } from "csv-stringify/sync";
import { writeFileSync } from "fs";

export async function writeToCSV(data, filePath = "./data.csv") {
  try {
    const csvString = stringify(data, { header: true });

    writeFileSync(filePath, csvString);
  } catch (err) {
    // console.log(err);
    throw err;
  }
}
