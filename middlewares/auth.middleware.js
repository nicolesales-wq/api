// middlewares/auth.middleware.js

// O token estático para validação (simulação de um token válido)
const VALID_TOKEN = "Bearer token-secreto-123";

/**
 * Middleware para validar a presença e a validade do token Bearer.
 * Retorna 401 Unauthorized se o token for inválido ou estiver ausente.
 */
export const validateBearerToken = (req, res, next) => {
    // 1. Pega o valor do cabeçalho Authorization
    const authHeader = req.headers.authorization;

    // 2. Verifica se o cabeçalho está presente
    if (!authHeader) {
        // Usa 401 para falha de autenticação (token ausente)
        return res.status(401).json({ 
            message: "Acesso não autorizado: Token de autenticação Bearer ausente.",
            hint: "Envie um cabeçalho 'Authorization' com o token secreto."
        });
    }

    // 3. Verifica se o token é o esperado
    // Assumimos que o formato correto é "Bearer <token>"
    if (authHeader !== VALID_TOKEN) {
        // Usa 401 para falha de autenticação (token inválido)
        return res.status(401).json({ 
            message: "Acesso negado: Token de autenticação Bearer inválido.",
            hint: "Verifique se o token é 'token-secreto-123'."
        });
    }

    // 4. Se a validação passar, continua para o próximo middleware/controller
    next();
};
