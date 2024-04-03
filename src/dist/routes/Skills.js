"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Skills_1 = __importDefault(require("../controllers/Skills"));
const multer_1 = __importDefault(require("../utils/multer"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/new', auth_1.default.isAuthenticated, auth_1.default.checkRole, multer_1.default.single('icon'), Skills_1.default.addNewSkill);
router.put('/edit/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, multer_1.default.single('icon'), Skills_1.default.updateSkill);
router.delete('/delete/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, Skills_1.default.deleteSkill);
router.get('/all', Skills_1.default.getAllSkills);
router.get('/:id', Skills_1.default.getSkillById);
exports.default = router;
