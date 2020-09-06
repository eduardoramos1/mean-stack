const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Minha resposta");
});

server.listen(process.env.PORT || 3000);
