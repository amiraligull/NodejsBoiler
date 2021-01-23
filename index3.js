/** @format */
// blocking synchronus way
// const name = "hello";
// console.log(name);
const fs = require("fs");
const http = require("http");
const url = require("url");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `this all we know about the avacado already :${textIn} and today date is ${Date.now()}`;
// fs.writeFileSync("./txt/output.text", textOut);
// console.log(" file is write successfully! ");

//Non-blocking synchronus way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.writeFile(
//       "./txt/append.txt",
//       `this we want to write ${data2}`,
//       "utf-8",
//       (err) => {
//         console.log("your files should be write now pleae check!!");
//       }
//     );
//   });
// });
// console.log("file will read!");
//////////////////////////////////////////////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/orverview") {
    res.end("overview  section");
  } else if (pathName === "/product") {
    res.end("products  section");
  } else if (pathName === "/API") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello amir",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening  to requests  on port 8000");
});
