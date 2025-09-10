# API Reference

This document provides detailed information about all available tools in the Jira MCP Server.

## Overview

The server provides a number of tools for interacting with Jira Server instances:

| Tool               | Purpose                 | Authentication Required |
|--------------------|-------------------------|-------------------------|
| `create_issue`     | Create new issues       | Yes                     |
| `get_issue`        | Retrieve issue details  | Yes                     |
| `search_issues`    | Search issues with JQL  | Yes                     |
| `update_issue`     | Update existing issues  | Yes                     |
| `add_comment`      | Add comments to issues  | Yes                     |
| `edit_comment`     | Edit existing comments  | Yes                     |
| `delete_comment`   | Delete comments         | Yes                     |
| `get_comments`     | Retrieve issue comments | Yes                     |
| `get_current_user` | Get current user info   | Yes                     |

## Tool Details

### create_issue

Creates a new issue in the specified project.

**Parameters:**
- `project` (required): Project key (e.g., "PROJ", "WEBAPP")
- `summary` (required): Issue title/summary
- `description` (optional): Detailed description of the issue
- `issueType` (optional): Type of issue (default: "Task")
- `priority` (optional): Priority level (e.g., "High", "Medium", "Low")
- `assignee` (optional): Username to assign the issue to

**Returns:**
- Issue key (e.g., "PROJ-123")
- Issue ID
- Self URL
- Created issue fields

**Example Response:**
```json
{
  "key": "PROJ-123",
  "id": "10001",
  "self": "https://jira.example.com/rest/api/2/issue/10001"
}
```

### get_issue

Retrieves detailed information about a specific issue.

**Parameters:**
- `issueKey` (required): The issue key (e.g., "PROJ-123")

**Returns:**
- Complete issue details including all fields
- Status, priority, assignee, reporter
- Description, comments, attachments
- Creation and update timestamps

### search_issues

Searches for issues using JQL (Jira Query Language).

**Parameters:**
- `jql` (required): JQL query string
- `maxResults` (optional): Maximum number of results (default: 50, max: 1000)

**Returns:**
- Array of matching issues
- Total count of results
- Issue summaries with key fields

**Common JQL Examples:**
- `assignee = currentUser()` - Issues assigned to you
- `project = PROJ AND status != Done` - Open issues in project
- `created >= -7d` - Issues created in last week

### update_issue

Updates fields on an existing issue.

**Parameters:**
- `issueKey` (required): The issue key to update
- `summary` (optional): New summary/title
- `description` (optional): New description
- `priority` (optional): New priority level
- `assignee` (optional): New assignee username
- `status` (optional): New status (triggers workflow transition)
- `components` (optional): Array of component names to set
- `labels` (optional): Array of label names to set

**Returns:**
- Success confirmation
- Updated field values

**Note:** Status changes must match valid workflow transitions for the issue type.

### add_comment

Adds a comment to an existing issue.

**Parameters:**
- `issueKey` (required): The issue key
- `body` (required): Comment text content

**Returns:**
- Comment ID
- Comment creation timestamp
- Author information

### edit_comment

Edits an existing comment on an issue.

**Parameters:**
- `issueKey` (required): The issue key
- `commentId` (required): The ID of the comment to edit
- `body` (required): New comment text content

**Returns:**
- Comment ID
- Update timestamp
- Success confirmation

### delete_comment

Deletes a comment from an issue.

**Parameters:**
- `issueKey` (required): The issue key
- `commentId` (required): The ID of the comment to delete

**Returns:**
- Success confirmation
- Deletion timestamp

**Note:** Only users with appropriate permissions can delete comments. Typically, users can delete their own comments, and administrators can delete any comment.

### get_comments

Retrieves all comments for an issue.

**Parameters:**
- `issueKey` (required): The issue key

**Returns:**
- Array of comments with:
  - Comment body/content
  - Author information
  - Creation and update timestamps
  - Comment IDs

### get_current_user

Gets information about the currently authenticated user.

**Parameters:**
- None required

**Returns:**
- Username and display name
- Email address
- User status and timezone
- Avatar URLs
- Group memberships

## Error Handling

All tools return structured error information for common scenarios:

### Authentication Errors (401)
- Invalid API token
- Expired credentials
- Missing authentication

### Permission Errors (403)
- Insufficient permissions for operation
- Project access denied
- Administrative restrictions

### Not Found Errors (404)
- Invalid issue key
- Project doesn't exist
- User not found

### Validation Errors (400)
- Invalid field values
- Required fields missing
- Malformed requests

## Rate Limiting

The server respects Jira's rate limiting policies:
- No built-in rate limiting in the MCP server
- Jira Server may impose its own limits
- Consider implementing client-side throttling for bulk operations

## Field Mappings

### Priority Levels
Common Jira priority names (varies by configuration):
- `Blocker` / `Critical` / `High` / `Medium` / `Low`

### Issue Types
Standard issue types (varies by project configuration):
- `Bug` / `Task` / `Story` / `Epic` / `Sub-task`

### Status Values
Depends on workflow configuration, common examples:
- `Open` / `In Progress` / `Under Review` / `Done` / `Closed`

## Response Examples

### Successful Issue Creation
```json
{
  "key": "WEBAPP-789",
  "id": "12345",
  "self": "https://jira.example.com/rest/api/2/issue/12345",
  "fields": {
    "summary": "Fix login validation bug",
    "status": {
      "name": "Open"
    },
    "priority": {
      "name": "High"
    }
  }
}
```

### Search Results
```json
{
  "total": 25,
  "issues": [
    {
      "key": "WEBAPP-123",
      "fields": {
        "summary": "Update user profile page",
        "status": {
          "name": "In Progress"
        }
      }
    }
  ]
}
```

### Error Responses

**Authentication Error:**
```json
{
  "error": "401 Unauthorized",
  "message": "Invalid API token or credentials"
}
```

**Permission Error:**
```json
{
  "error": "403 Forbidden", 
  "message": "User does not have permission to create issues in project PROJ"
}
```

**Validation Error:**
```json
{
  "error": "400 Bad Request",
  "message": "Field 'priority' has invalid value 'SuperHigh'. Valid values: Low, Medium, High, Critical"
}
```

**Network Error:**
```json
{
  "error": "ECONNREFUSED",
  "message": "Could not connect to Jira server. Check JIRA_BASE_URL and network connectivity."
}
```

## Direct Testing

For development and debugging, you can test the server directly:

```bash
# Set environment variables
export JIRA_BASE_URL="https://your-jira-server.com"
export JIRA_API_TOKEN="your-api-token"

# Run the server
node server.js

# The server expects MCP protocol input via stdin
```

## Best Practices

1. **Always validate issue keys** before operations
2. **Check user permissions** for project access
3. **Use appropriate issue types** for your project
4. **Follow workflow transitions** when updating status
5. **Include meaningful descriptions** when creating issues
6. **Test with non-production data** during development