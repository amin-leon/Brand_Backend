"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Messages_1 = __importDefault(require("../controllers/Messages"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/new', Messages_1.default.sendMessage);
router.delete('/delete/:id', auth_1.default.isAuthenticated, auth_1.default.checkRole, Messages_1.default.deleteMessage);
router.get('/all', auth_1.default.isAuthenticated, auth_1.default.checkRole, Messages_1.default.getAllMessages);
router.put('/read/:id', Messages_1.default.readMessage);
exports.default = router;
