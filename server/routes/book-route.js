import { Router } from "express";
import { 
    addBookNew, 
    getBookSingle, 
    deleteBook, 
    getBooksAll, 
    updateBook 
} from "../controllers/book-controller.js";
import reviewRouter from './review-route.js'
import { validateBookDataRules } from "../middleware/book-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/')
.get(getBooksAll)
.post(validateBookDataRules(),checkValidationResult,addBookNew);

router.route('/:id')
.get(getBookSingle)
.put(validateBookDataRules(),checkValidationResult,updateBook)
.delete(deleteBook);

// router.route('?genre=:tag')
// .get();

// router.route('?author=author')
// .get();

// router.route('?price=:priceRange')
// .get();

router.use('/:id/reviews',reviewRouter);

export default router;