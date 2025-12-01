// app.js
import express from 'express';
import apiRoutes from './routes/api.routes.js'; // Importa o arquivo de rotas

// Inicializa a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar corpos de requisição JSON (opcional, mas boa prática)
app.use(express.json());

// Configuração das rotas
// Todas as rotas definidas em apiRoutes estarão acessíveis a partir da raiz ('/')
app.use('/', apiRoutes);

// Middleware para lidar com rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ 
        message: 'Endpoint não encontrado',
        details: `O recurso em ${req.originalUrl} não existe neste servidor.`
    });
});

// Middleware de tratamento de erros global (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Erro interno do servidor',
        error: err.message 
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`\n🚀 API rodando em http://localhost:${PORT}`);
    console.log('Rotas disponíveis: /, /about, /developer, /greet/:nome');
    console.log('Para testar, acesse o Postman ou seu navegador.');
});
// Para usar imports (como 'import express from 'express''), 
// adicione "type": "module" ao seu package.json.
