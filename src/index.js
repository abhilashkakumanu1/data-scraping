import { getData } from "./scrape.js";
import { writeToCSV } from "./writeToCSV.js";

(async () => {
  try {
    console.log("Start.");

    const data = await getData("uranium");

    console.log("Done getting the data.");

    await writeToCSV(data);

    console.log("Done writing to the csv file.");
  } catch (err) {
    console.log(err);
  }
})();
