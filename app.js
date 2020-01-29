const express = require('express');
const app = express();
const morgan = require('morgan');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev')); //exibe um log no terminal
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//SE NÃO ENCONTRAR UMA ROTA ELE ENTRA AQUI
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});
// app.use('/teste', (req, res ,next) => {
//     res.status(200).send({
//         mensagem: 'OK, rodando'
//     });
// });

module.exports = app;