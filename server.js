const http = require("http"); //importando a biblioteca http

http
    .createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': "application/json" });

        if (request.url === '/produto') {
            response.end(JSON.stringify({
                message: "Rota de produto",
            }));
        }

        if (request.url === '/usuario') {
            response.end(JSON.stringify({
                message: "Rota de usuario",
            }));
        }

        response.end(
            JSON.stringify({
                message: "Qualquer outra rota",
            })
        );

    })
    .listen(2, () => console.log("Servidor está rodando na porta 1789")); //função que recebe a requisição.


