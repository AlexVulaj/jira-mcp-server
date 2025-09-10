# Workflow Examples

These examples show how to use natural language to accomplish common Jira tasks through your AI assistant.

## Creating Issues

### Bug Report
**You say:** "Create a bug in project WEBAPP with the title 'Login form validation fails' and description 'Users can submit empty login forms without validation errors'. Set priority to High, assign it to john.doe, and add component 'frontend' with label 'security'."

**What happens:** Creates a new bug issue with all the specified details, including components and labels for better organization.

### Feature Request
**You say:** "I need to create a new feature request in the MOBILE project called 'Add dark mode support' with description 'Users have requested a dark theme option in the mobile app settings'."

**What happens:** Creates a new feature/story with the provided information.

### Task with Detailed Info
**You say:** "Create a task in PROJECT-A titled 'Update API documentation' and describe it as 'The REST API docs are outdated and missing the new v2 endpoints. Need to update examples and add authentication section.' Make it normal priority."

## Searching and Finding Issues

### Finding Your Work
**You say:** "Show me all issues assigned to me that are currently in progress."

**What happens:** Searches for issues where assignee = currentUser() AND status = "In Progress"

### Project Overview
**You say:** "What are all the open bugs in the WEBAPP project?"

**What happens:** Finds all unresolved issues of type Bug in the WEBAPP project.

### Recent Activity
**You say:** "Find all issues created in the last week across all projects."

**What happens:** Searches for recently created issues to see what's new.

### Specific Issue Lookup
**You say:** "Get me the details for issue WEBAPP-123."

**What happens:** Retrieves full information about that specific issue.

## Updating Issues

### Status Changes
**You say:** "Move issue WEBAPP-456 to 'In Progress' status, add component 'backend', and add a comment saying 'Starting work on this now'."

**What happens:** Updates the issue status, adds the component, and adds the comment.

### Reassignment
**You say:** "Assign issue MOBILE-789 to jane.smith, change the priority to High, and add labels 'urgent' and 'mobile-app'."

**What happens:** Updates assignee, priority, and labels in one operation.

### Comment Management
**You say:** "Add a comment to WEBAPP-123 saying 'Found the root cause - it's related to the session timeout logic. Will have a fix by EOD.'"

**What happens:** Adds the comment to the specified issue.

**You say:** "Edit comment 123456 on issue WEBAPP-123 to say 'Update: Fix is complete and tested, ready for review.'"

**What happens:** Updates the existing comment with new content.

**You say:** "Delete comment 789012 from WEBAPP-123 - it was posted by mistake."

**What happens:** Removes the incorrect comment from the issue.

## Daily Workflow Examples

### Morning Standup Prep
**You say:** "What issues did I work on yesterday? Show me anything assigned to me that was updated in the last 24 hours."

### Sprint Planning
**You say:** "Show me all unassigned bugs in the WEBAPP project so we can distribute them in today's planning meeting."

### End of Day Update
**You say:** "Find issue WEBAPP-456 and add a comment with my progress: 'Completed the frontend changes, still working on backend validation. About 70% done.'"

### Code Review Follow-up
**You say:** "Create a new task in DEV project called 'Address code review feedback for PR #234' and assign it to me."

## Team Communication

### Escalation
**You say:** "Update issue CRITICAL-001 to set priority to Blocker, add label 'release-blocker', and add comment 'This is blocking the release, needs immediate attention from the team lead.'"

### Handoff
**You say:** "I need to reassign WEBAPP-789 from me to john.doe and add a comment explaining where I left off: 'Completed initial investigation, the issue is in the payment gateway integration. Check the logs in /var/log/payments/ for more details.'"

### Comment Correction
**You say:** "I made a typo in my last comment on WEBAPP-456. Edit comment 987654 to fix the spelling - change 'recieve' to 'receive'."

### Status Updates
**You say:** "Add a comment to FEATURE-123 with this update: 'Implementation is complete and tested locally. Ready for QA review. Deployed to staging environment.'"

## Tips for Natural Language Usage

1. **Be specific about projects** - Always mention the project key when creating or updating issues
2. **Include context** - The more details you provide, the better the AI can help
3. **Use standard Jira terminology** - Status names, priority levels, issue types should match your Jira setup
4. **Combine actions** - You can often update multiple fields, components, labels, or add comments in a single request
5. **Ask for summaries** - Request overviews of your work, team progress, or project status
6. **Organize with components and labels** - Use components to categorize by system area (frontend, backend, api) and labels for tracking (urgent, bug-fix, feature)
7. **Comment management** - Remember you can edit or delete comments if you make mistakes or need to update information
8. **Get comment IDs** - Use "get comments for PROJ-123" to see comment IDs before editing or deleting