import { Router } from "express";
import { addCartItem, deleteCartItem, getCart } from "../controllers/cart-controller.js";
import { validateCartDataRules } from "../middleware/cart-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/:userId')
.get(getCart)

router.route('/:userId/:bookId')
.put(validateCartDataRules(),checkValidationResult,addCartItem)
.delete(deleteCartItem);

export default router;