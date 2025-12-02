// app.js
import express from 'express';
import apiRoutes from './routes/api.routes.js'; // Importa o arquivo de rotas

// Inicializa a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar corpos de requisição JSON (CRUCIAL para POST/PUT)
app.use(express.json());

// Configuração das rotas
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
    console.log('Rotas PÚBLICAS: /, /about, /developer, /greet/:nome');
    console.log('Rotas PROTEGIDAS: /items (GET, POST), /items/:id (PUT)');
    console.log('Token Bearer NECESSÁRIO: token-secreto-123');
});
