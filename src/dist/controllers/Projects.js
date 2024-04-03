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
const Projects_1 = __importDefault(require("../models/Projects"));
const projectsValidations_1 = __importDefault(require("../validations/projectsValidations"));
class ProjectsController {
    static addNewProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, category, description, link } = req.body;
                const image = req.file ? req.file.path : null;
                const { error } = projectsValidations_1.default.validate({ title, description, category, image, link });
                if (error) {
                    return res.status(400).json({
                        status: "Bad Request",
                        message: error.details[0].message,
                        res: req.body
                    });
                }
                const newProject = new Projects_1.default({
                    title,
                    category,
                    description,
                    link,
                    image
                });
                yield newProject.save();
                return res.status(201).json({
                    status: "success",
                    Message: "Project added",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: "Fail",
                    Message: "Project Not added :)"
                });
            }
        });
    }
    static updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, category, link } = req.body;
                const { id } = req.params;
                const image = req.file ? req.file.path : null;
                const foundProjectAndUpdate = yield Projects_1.default.findByIdAndUpdate(id, { title, description, category, image, link }, { new: true });
                if (!foundProjectAndUpdate) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Project not found :)",
                        foundProjectAndUpdate
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    Message: "Project Successful updated"
                });
            }
            catch (error) {
                return res.status(500).json({
                    Status: "Fail",
                    Message: "Project not updated"
                });
            }
        });
    }
    static deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const foundProject = yield Projects_1.default.findById(id);
                if (!foundProject) {
                    return res.status(404).json({
                        status: "Not found",
                        Message: "Project Not found :)"
                    });
                }
                yield Projects_1.default.findByIdAndDelete(id);
                return res.status(200).json({
                    status: "OK",
                    Message: "Project deleted !",
                    id: id
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Fail",
                    Message: "Fail to delete project"
                });
            }
        });
    }
    static getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allprojects = yield Projects_1.default.find();
                if (allprojects.length === 0) {
                    return res.status(404).json({
                        Message: "No Projects found :)"
                    });
                }
                return res.status(200).json({
                    status: "success",
                    data: allprojects,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "status",
                    message: "Unable to display Projects:)",
                });
            }
        });
    }
    static getSingleProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const singleProject = yield Projects_1.default.findOne({ _id: id });
                if (!singleProject) {
                    return res.status(404).json({
                        Message: "No Project Found :)"
                    });
                }
                return res.status(200).json({
                    status: "sucess",
                    userInfo: singleProject,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Unable to find Project :)",
                });
            }
        });
    }
}
exports.default = ProjectsController;
