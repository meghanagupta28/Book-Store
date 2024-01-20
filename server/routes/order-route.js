import { Router } from "express";
import { addOrderNew,
         getOrderbyOrderId, 
         getOrdersAll 
        } from "../controllers/order-controller.js";
import { getOrdersByUserId, validateOrderDataRules } from "../middleware/order-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/:userID')
.get(getOrdersByUserId, getOrdersAll)
.post(validateOrderDataRules(),checkValidationResult,getOrdersByUserId, addOrderNew);

router.route('/:userID/:orderID')
.get(getOrderbyOrderId)


export default router;