"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issue = exports.IssueSchema = void 0;
const mongoose_1 = require("mongoose");
const issueStates = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    CLOSED: 'closed',
};
const issuePriorities = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGHT: 'hight',
};
exports.IssueSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    userAssigned: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    state: {
        type: String,
        enum: Object.values(issueStates),
        default: issueStates.OPEN,
    },
    priority: {
        type: String,
        enum: Object.values(issuePriorities),
        default: issuePriorities.LOW,
    },
}, { timestamps: true });
exports.Issue = (0, mongoose_1.model)('Issue', exports.IssueSchema);
//# sourceMappingURL=Issue.js.map