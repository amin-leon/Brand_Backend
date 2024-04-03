"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Projects_1 = __importDefault(require("../controllers/Projects"));
const multer_1 = __importDefault(require("../utils/multer"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/add', auth_1.default.isAuthenticated, auth_1.default.checkRole, multer_1.default.single('image'), Projects_1.default.addNewProject);
router.put('/edit/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, multer_1.default.single('image'), Projects_1.default.updateProject);
router.delete('/remove/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, Projects_1.default.deleteProject);
router.get('/all', Projects_1.default.getAllProjects);
router.get('/:id', Projects_1.default.getSingleProject);
exports.default = router;
