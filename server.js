// Importações
const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3000;

// Middleware de Logs (para ver o fluxo)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Requisição recebida: ${req.method} ${req.originalUrl}`);
    next();
});

// 1. ROTAS DE DEMONSTRAÇÃO

/**
 * Rota para simular um erro 400 (Bad Request / Requisição Inválida).
 */
router.get('/400', (req, res, next) => {
    try {
        const { id } = req.query;

        // Lógica de validação: Se o ID estiver ausente ou inválido, lançamos um erro 400.
        if (!id) {
            const error = new Error('Validação falhou: O parâmetro "id" é obrigatório.');
            error.status = 400;
            throw error;
        }

        // Simulação de sucesso
        res.status(200).json({
            status: 200,
            message: `Dados para ID ${id} processados com sucesso.`,
            receivedId: id
        });
    } catch (error) {

        next(error);
    }
});

/**
 * Rota para simular um erro 500 (Internal Server Error / Erro Inesperado).
 */
router.get('/500', (req, res, next) => {
    try {

        // Simula uma tentativa de acessar uma propriedade de algo que é 'null' ou 'undefined'
        const data = null;

        throw new Error('Erro crítico inesperado: Falha ao conectar ou processar dados internos.');

    } catch (error) {
        // O status 500 será o padrão, mas o next(error) garante que ele será logado.
        next(error);
    }
});

// Adiciona as rotas ao app
app.use('/api/error', router);

// 2. MIDDLEWARE DE ERROS

/**
 * Middleware para capturar erros 404 (Não Encontrado).
 */
app.use((req, res, next) => {
    // Cria um objeto de erro para 404 e passa para o handler de erro centralizado
    const error = new Error(`Rota Não Encontrada: ${req.originalUrl}`);
    error.status = 404;
    next(error); // Passa para o próximo middleware (o Error Handler)
});


/**
 * Esta função de quatro argumentos (err, req, res, next) é o coração do tratamento de erros.
 */
app.use((err, req, res, next) => {
    // Determina o status: 500 (Erro de Servidor) é o padrão.
    const status = err.status || 500;
    
    // 3. REGISTRO DE ERROS (console.error) com informações relevantes
    console.error('=======================================');
    console.error(`ERRO REGISTRADO - STATUS ${status}`);
    console.error(`Método: ${req.method}, Rota: ${req.originalUrl}`);
    console.error(`Mensagem do Erro: ${err.message}`);

    console.error('=======================================');

    // Envia a resposta de erro estruturada para o cliente
    res.status(status).json({
        status: status,
        error: status === 404 ? 'Não Encontrado' : (status === 400 ? 'Requisição Inválida' : 'Erro Interno do Servidor'),
        message: err.message || 'Ocorreu um erro inesperado no servidor.',
        timestamp: new Date().toISOString()
    });
});

// INICIALIZAÇÃO DO SERVIDOR

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('\n--- Rotas de Teste ---');
    console.log(`400 (Bad Request): Acesse http://localhost:${PORT}/api/error/400 (sem query 'id')`);
    console.log(`500 (Internal Error): Acesse http://localhost:${PORT}/api/error/500`);
    console.log(`404 (Not Found): Acesse http://localhost:${PORT}/rota/que/nao/existe`);
    console.log('----------------------');
});
