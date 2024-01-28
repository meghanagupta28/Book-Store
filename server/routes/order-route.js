import { Router } from "express";
import { addOrderNew,
         getOrderbyOrderId, 
         getOrdersAll 
        } from "../controllers/order-controller.js";
import { validateOrderDataRules } from "../middleware/order-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/:userID')
.get(getOrdersAll)
.post(validateOrderDataRules(),checkValidationResult, addOrderNew);

router.route('/:userID/:orderID')
.get(getOrderbyOrderId)


export default router;