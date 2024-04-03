"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Subscribe_1 = __importDefault(require("../controllers/Subscribe"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/subscribe', Subscribe_1.default.subscribe);
router.delete('/delete/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, Subscribe_1.default.deleteSub);
router.get('/all', auth_1.default.isAuthenticated, auth_1.default.checkRole, Subscribe_1.default.getAllSubs);
exports.default = router;
