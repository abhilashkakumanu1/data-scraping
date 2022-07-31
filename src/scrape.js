import axios from "axios";

const BASE_URL = "https://www.osti.gov/api/v1/records";
const ROWS = 150;

export async function getData(query) {
  const data = [];
  let page = 1;

  while (true) {
    const params = { q: query, rows: ROWS, page: page };
    const response = await axios.get(BASE_URL, {
      params,
    });
    const results = response.data;

    if (results.length === 0) break;

    data.push(...processResults(results));

    console.log(`page: ${page}`);

    if (page === 500) {
      // console.log(data);
      break;
    }

    page++;
  }
  return data;
}

function processResults(results) {
  const data = results.map((result) => {
    const {
      osti_id,
      title,
      authors,
      publication_date,
      research_orgs,
      product_type,
      article_type,
      journal_name,
    } = result;

    return {
      title,
      link: `https://www.osti.gov/biblio/${osti_id}`,
      product_type,
      article_type,
      journal_name,
      publication_date,
      authors: authors.map((author) => `"${author}"`).join(","),
      research_orgs: research_orgs
        .map((research_org) => `"${research_org}"`)
        .join(","),
    };
  });
  return data;
}
