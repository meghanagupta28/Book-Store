import { Router } from "express";
import { addToWishlist, deleteFromWishlist, getWishlist } from "../controllers/wishlist-controller.js";
import { validateWishlistDataRules } from "../middleware/wishlist-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/:userId')
.get(getWishlist);

router.route('/:userId/:bookId')
.put(validateWishlistDataRules(),checkValidationResult,addToWishlist)
.delete(deleteFromWishlist);


export default router;