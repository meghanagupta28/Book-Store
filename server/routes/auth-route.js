import { Router } from "express";
import { 
    registerController,
    loginController, 
} from "../controllers/auth-controller.js";

import { 
    validateUserDataResult,
    validateRegistrationDataRules, 
    validateLoginDataRules 
} from "../middleware/auth-middleware.js";

const router = Router();

router.post('/register',validateRegistrationDataRules(),validateUserDataResult, registerController);
router.post('/login',validateLoginDataRules(), validateUserDataResult,loginController);

export default router;