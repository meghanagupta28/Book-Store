import { Router } from "express";
import { 
    addReviewNew,
    deleteReview, 
    getReviewsAll, 
    updateReview 
} from "../controllers/review-controller.js";
import { validateReviewDataRules } from "../middleware/review-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/')
.get(getReviewsAll)
.post(validateReviewDataRules(),checkValidationResult,addReviewNew);

router.route('/:reviewId')
.put(validateReviewDataRules(), checkValidationResult,updateReview)
.delete(deleteReview);


export default router;