import axios from "axios";

const BASE_URL = "https://www.osti.gov/api/v1/records";
const ROWS = 100;

export async function getData(query) {
  const data = [];
  let page = 0;

  //  Initial query to get the number of results, number of pages
  const params = { q: query, rows: ROWS, page: 0 };
  const response = await axios.get(BASE_URL, {
    params,
  });

  // const totalNumberOfResults = response.headers["x-total-count"];
  // const totalNumberOfPages = Math.ceil(totalNumberOfResults / ROWS);

  //   console.log(totalNumberOfResults, totalNumberOfPages);

  while (true) {
    const params = { q: query, rows: ROWS, page: page };
    const response = await axios.get(BASE_URL, {
      params,
    });
    const results = response.data;

    if (results.length === 0) break;

    data.push(...processResults(results));

    page++;

    console.log(page);

    if (page === 20) {
      //   console.log(data);
      break;
    }
  }
  return data;
}

function processResults(results) {
  const data = results.map((result) => {
    const {
      authors,
      publication_date,
      research_orgs,
      product_type,
      article_type,
      journal_name,
    } = result;

    return {
      authors: authors.map((author) => `"${author}"`).join(","),
      publication_date,
      research_orgs: research_orgs
        .map((research_org) => `"${research_org}"`)
        .join(","),
      product_type,
      article_type,
      journal_name,
    };
  });
  return data;
}
