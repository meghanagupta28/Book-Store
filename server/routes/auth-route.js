import { Router } from "express";
import { 
    registerController,
    loginController, 
} from "../controllers/auth-controller.js";

import { 
    validateRegistrationDataRules, 
    validateLoginDataRules 
} from "../middleware/auth-middleware.js";

import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.post('/register',validateRegistrationDataRules(),checkValidationResult, registerController);
router.post('/login',validateLoginDataRules(), checkValidationResult, loginController);

export default router;