// routes/api.routes.js
import { Router } from 'express';
// Importa as funções de controller
import { 
    home, 
    about, 
    developerInfo, 
    dynamicGreeting 
} from '../controllers/general.controller.js';

const router = Router();

// Rota 1: Rota Principal (GET /)
// Retorna título e boas-vindas.
router.get('/', home);

// Rota 2: Sobre a API (GET /about)

export default router;
