import { Router } from "express";
import { 
    addTagNew, 
    deleteTag, 
    getTags, 
    updateTag 
} from "../controllers/tag-controller.js";
import { validateTagDataRules } from "../middleware/tag-middleware.js";
import { checkValidationResult } from "../middleware/error-middleware.js";

const router = Router();

router.route('/')
.get(getTags)
.post(validateTagDataRules(),checkValidationResult,addTagNew);

router.route('/:tagId')
.put(validateTagDataRules(), checkValidationResult,updateTag)
.delete(deleteTag);


export default router;