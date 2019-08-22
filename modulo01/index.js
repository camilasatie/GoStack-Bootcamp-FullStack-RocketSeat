// Importar o express
const express = require("express");

// verificar se o express foi implementado corretamente
// console.log(express);

const server = express();
server.use(express.json());

// Banco de dados de usuário
const users = ["Diego", "Sache", "Victor"];

// Midleware Global para fazer um log da requisição
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url};`);
  next();
  console.timeEnd("Request");
});

// Midleware Local - Verificação se existe um usuário existente
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ erro: "User name is required" });
  }
  return next();
}

// Midleware para as rotas que recebe o usuário como parãmetro.
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user;
  return next();
}

// Rota que lista todos os usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Rota que lista apens um usuário
server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  return res.json(req.user);
});

// Criação de Usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

// Edição de Usuário
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;

  return res.json(users);
});

// Exclusão de Usuário
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

// criando um servido com o Node, uma API
server.listen(3000);
