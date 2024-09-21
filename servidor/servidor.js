import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";
import cookieParser from "cookie-parser";

import "./db/dbConnect.js";

const app = express();
const porta = process.env.porta || 8085;

const caminhoAtual = url.fileURLToPath(import.meta.url);

const diretorioPublico = path.join(caminhoAtual, "../..", "public");
app.use(express.static(diretorioPublico));

app.use(cookieParser());

//app.get("/home", (req, res, next) => {
//  autorizarUsuario(req, res, next);
//}, (req, res) => {
//  res.redirect("/paginaCompra/Home.html");
//});

app.get("/home",(req,res) =>{
  res.redirect("/home/home.html")
});


  app.get("/cadastro", (req, res) => {
    res.redirect("/cadastro/cadastro.html")
  });



  app.get("/login", (req, res) => {
    res.redirect("index.html")
  });





const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => console.log(`Servidor escutando na porta ${porta}`));

const io = new Server(servidorHttp);



export default io;
