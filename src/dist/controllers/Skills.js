"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Skills_1 = __importDefault(require("../models/Skills"));
const SkillsValidations_1 = __importDefault(require("../validations/SkillsValidations"));
class SkillsController {
    static addNewSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, percent } = req.body;
                const icon = req.file ? req.file.path : null;
                const { error } = SkillsValidations_1.default.validate({ title, description, percent, icon });
                if (error) {
                    return res.status(400).json({
                        status: "Bad Request",
                        message: error.details[0].message,
                    });
                }
                const newSkill = new Skills_1.default({
                    title,
                    description,
                    percent,
                    icon
                });
                yield newSkill.save();
                return res.status(201).json({
                    status: "success",
                    Message: "new Skill added",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: "Fail",
                    Message: "new Skill Not added :)"
                });
            }
        });
    }
    static updateSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, percent } = req.body;
                const { id } = req.params;
                const icon = req.file ? req.file.path : null;
                const foundSkillAndUpdate = yield Skills_1.default.findByIdAndUpdate(id, { title, description, percent, icon }, { new: true });
                if (!foundSkillAndUpdate) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Skill not found :)"
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    Message: "Skill Successful updated"
                });
            }
            catch (error) {
                return res.status(500).json({
                    Status: "Fail",
                    Message: "Skill not updated"
                });
            }
        });
    }
    static deleteSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const foundSkill = yield Skills_1.default.findById(id);
                if (!foundSkill) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Skill Not found :)"
                    });
                }
                yield Skills_1.default.findByIdAndDelete(id);
                return res.status(200).json({
                    status: "OK",
                    Message: "Skill deleted !",
                    id: id
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Fail to delete Skill"
                });
            }
        });
    }
    static getSkillById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const skill = yield Skills_1.default.findById(id);
                if (!skill) {
                    return res.status(404).json({
                        Message: "Skill not found :)"
                    });
                }
                return res.status(200).json({
                    status: "success",
                    data: skill,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: "Unable to get Skill details :(",
                });
            }
        });
    }
    static getAllSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allSkills = yield Skills_1.default.find();
                if (allSkills.length === 0) {
                    return res.status(404).json({
                        Message: "No skills found :)"
                    });
                }
                return res.status(200).json({
                    status: "sucess",
                    data: allSkills,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "status",
                    message: "Unable to display Skills:)",
                });
            }
        });
    }
}
exports.default = SkillsController;
