//o Express.js é um framework para node que serve para gerenciar requisições http 
const express = require("express"); //importando o framework express
const { randomUUID } = require("crypto"); //para gerar o id aleatório
const fs = require("fs"); //para manipular o arquivo que guardá nossos produtos

const app = express();

app.use(express.json());

let products = []; //array que guarda os produtos

//ler os dados do arquivo
fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});

/**
 * Métodos básicos (requisições):
 
 * POST -> Inserir um dado
 * GET -> Buscar um/mais dados
 * PUT -> Alterar um dado
 * DELETE -> Remover um dado
 */

/**
 * Tipos de parâmetros mais comuns no Express
 
 * Body -> Sempre que eu quiser enviar dados para minha aplicação
 * Params -> /product/87687678688 (de rota, obrigatórios)
 * Query ->/product?id=687687687&value=7868767678
 */

//requisição post
app.post("/products", (request, response) => {
    //Nome e preço => name e price

    const { name, price } = request.body;

    const product = { //objeto produto
        name,
        price,
        id: randomUUID(), //gera o id com o id aleatório
    };

    products.push(product); //coloca o objeto no array

    productFile(); //chama a função para escrever os dados no arquivo

    return response.json(product);

});

//requisição get
app.get("/products", (request, response) => {
    return response.json(products)
});

//get busca pelo id
app.get("/products/:id", (request, response) => {
    const { id } = request.params;

    //salva no produto o objeto do array que possui valor e tipagem (= = =) iguais ao id
    const product = products.find((product) => product.id === id);
    return response.json(product);
});

//alterar um produto - requisição put
app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    //pega a posição do array onde o produto está
    const productIndex = products.findIndex((product) => product.id === id);

    products[productIndex] = {
        ...products[productIndex], //pega todos os parametros menos name e price
        name,
        price,
    };

    productFile();

    return response.json({ message: "Produto alterado com sucesso" });
});

//request delete
app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1); //vai remover uma posição com base nesse id 

    productFile();

    return response.json({ message: "Produto removido com sucesso!" });

});

//função que insere o array no arquivo
function productFile() {
    fs.writeFile("products.json", JSON.stringify
        (products), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Produto inserido");
            }
        });
}

app.listen(1789, () => console.log("O servidor está rodando na porta 1789"));