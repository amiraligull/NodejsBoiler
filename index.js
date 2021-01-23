/** @format */

const fs = require("fs");
const http = require("http");
const url = require("url");

// asyncronous call back method
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};
// load file at once this is our templating
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/product-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObjectArray = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // thsi is for home page
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = dataObjectArray
      .map((product) => replaceTemplate(tempCard, product))
      .join(" ");
    const output = tempOverview.replace("{%PRODUCTCARD%}", cardsHtml);

    res.writeHead(200, { "content-type": "text/html" });
    res.end(output);

    // product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = dataObjectArray[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //thsi is for api page
  else if (pathname === "/API") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // this is  404 page
  } else {
    res.end("Page not found ");
  }
});

server.listen("8000", "127.0.0.1", () => {
  console.log("this is port 8000");
});
