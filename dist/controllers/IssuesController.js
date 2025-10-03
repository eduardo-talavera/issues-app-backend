"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuesController = void 0;
const Issue_1 = require("../models/Issue");
const User_1 = require("../models/User");
class IssuesController {
    static createIssue = async (req, res) => {
        const { title, description, author, userAssigned } = req.body;
        try {
            const issue = new Issue_1.Issue({
                title,
                description,
                author,
                userAssigned: userAssigned ?? null,
            });
            await issue.save();
            res.send('Ticket creado exitosamente');
        }
        catch (error) {
            res.status(500).send('Error al crear el ticket');
        }
    };
    static getIssueById = async (req, res) => {
        try {
            res.json(req.issue);
        }
        catch (error) {
            res.status(500).send('Error al obtener el ticket');
        }
    };
    static updateIssue = async (req, res) => {
        try {
            req.issue.title = req.body.title;
            req.issue.description = req.body.description;
            await req.issue.save();
            res.send('ticket actualizado exitosamente');
        }
        catch (error) {
            res.status(500).send('Error al actualizar el ticket');
        }
    };
    static deleteIssue = async (req, res) => {
        try {
            const assignedUser = req.issue.userAssigned?.toString();
            if (assignedUser) {
                const user = await User_1.User.findById(assignedUser);
                if (user) {
                    user.assignedIssues = user.assignedIssues.filter((issueId) => issueId.toString() !== req.issue._id.toString());
                    await user.save();
                }
            }
            await req.issue.deleteOne();
            res.send('Tarea eliminada exitosamente');
        }
        catch (error) {
            res.status(500).send('Error al actualizar la tarea');
        }
    };
    static updateState = async (req, res) => {
        try {
            const { state } = req.body;
            req.issue.state = state;
            await req.issue.save();
            res.send('Estado del ticket actualizado exitosamente');
        }
        catch (error) {
            res.status(500).send('Error al actualizar el estado del ticket');
        }
    };
}
exports.IssuesController = IssuesController;
//# sourceMappingURL=IssuesController.js.map