"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueExists = IssueExists;
const Issue_1 = require("../models/Issue");
async function IssueExists(req, res, next) {
    try {
        const { issueId } = req.params;
        const issue = await Issue_1.Issue.findById(issueId);
        if (!issue) {
            const error = new Error('Ticket no encontrado');
            res.status(404).json({ error: error.message });
            return;
        }
        req.issue = issue;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
}
//# sourceMappingURL=Issue.js.map