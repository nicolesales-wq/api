// controllers/general.controller.js

/**
 * Rota Principal (GET /)
 * Retorna JSON com título e boas-vindas.
 */
export const home = (req, res) => {
    res.status(200).json({
        api_title: "API de Informações Simples",
        message: "Bem-vindo à API de Demonstração! Use /about, /developer ou /greet/:name para acessar outras funcionalidades.",
        available_endpoints: [
            "/", 
            "/about", 
            "/developer", 
            "/greet/:name"
        ]
    });
};

/**
 * Sobre a API (GET /about)
 * Retorna JSON com dados fictícios sobre a API.
 */
export const about = (req, res) => {
    res.status(200).json({
        api_name: "InfoCore API",
        version: "1.0.3",
        author: "Automatons Corp.",
        description: "Uma interface de demonstração leve, projetada para ilustrar a arquitetura Controller-Route em Express.js.",
        license: "MIT"
    });
};

/**
 * Info do Desenvolvedor (GET /developer)
 * Retorna nome, data atual e mensagem motivacional.
 */
export const developerInfo = (req, res) => {
    // Nota: Usando a data atual (do momento da execução/compilação)
    const currentDate = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'America/Sao_Paulo'
    });

    res.status(200).json({
        developer: "Gemini Model (Assistente de Desenvolvimento)",
        current_date: currentDate,
        message: "Lembre-se: 'A estrutura é a base da inovação. Mantenha seu código limpo, e suas possibilidades serão infinitas!'",
        motto: "Código Organizado, Mente Clara."
    });
};

/**
 * Saudação Dinâmica (GET /greet/:name)
 * Recebe um nome via parâmetro e retorna saudação personalizada.
 */
export const dynamicGreeting = (req, res) => {
    // O nome é extraído dos parâmetros da URL
    const name = req.params.name; 

    // Verificação básica para garantir que o nome não está vazio, embora o Express trate 
    // a rota como definida se o parâmetro for passado na URL.
    if (!name || name.trim() === '') {
        return res.status(400).json({
            error: "Parâmetro 'nome' ausente.",
            usage: "Use o formato: /greet/SeuNome"
        });
    }

    // Cria a saudação personalizada
    res.status(200).json({
        greeting: `Olá, ${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}! Que bom ter você por aqui.`,
        tip: "Você usou um parâmetro de rota com sucesso!"
    });
};
