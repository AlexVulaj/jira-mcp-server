# Jira MCP Server

> **📚 Educational Project Notice**  
> This repository was created as a learning exercise and educational project.
> While functional,
> please note that Atlassian provides an [official MCP server](https://www.atlassian.com/platform/remote-mcp-server) for Jira integration,
> which may be more suitable for production use.

An MCP (Model Context Protocol) server for integrating with Jira Server instances.

## Features

- Create new issues with components and labels
- Read/search existing issues  
- Update issue fields, status, components, and labels
- Manage comments on issues (add, edit, delete)
- Get current user information
- JQL (Jira Query Language) support

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. **Option A: Add to Claude Code MCP configuration:**
   ```bash
   claude mcp add jira-server \
     node /path/to/jira-mcp-server/server.js \
     --env JIRA_BASE_URL=https://your-jira-server.com \
     --env JIRA_API_TOKEN=your-api-token \
     --scope user
   ```

   Replace:
   - `/path/to/jira-mcp-server/` with the actual path to this directory
   - `https://your-jira-server.com` with your actual Jira server URL (e.g., https://jira.acme.com, https://acme-jira.example.com)
   - `your-api-token` with your API token

3. **Option B: Add to Cursor MCP configuration:**
   
   Add this to your Cursor settings (Cursor → Settings → Features → Model Context Protocol):
   ```json
   {
     "mcpServers": {
       "jira-server": {
         "command": "node",
         "args": ["/path/to/jira-mcp-server/server.js"],
         "env": {
           "JIRA_BASE_URL": "https://your-jira-server.com",
           "JIRA_API_TOKEN": "your-api-token"
         }
       }
     }
   }
   ```

   Replace the same placeholders as above. After adding this configuration:
   1. Restart Cursor
   2. Open a new chat and verify the tools are available
   3. If you see "No tools or prompts", check the MCP logs in Cursor's output panel

4. **Option C: Run server locally for testing:**
   ```bash
   JIRA_BASE_URL=https://your-jira-server.com \
   JIRA_API_TOKEN=your-api-token \
   npm start
   ```

## What You Can Do

This server enables your AI assistant to handle all core Jira operations through natural language:

- **Create and update issues** - "Create a bug about the login form" or "Update PROJ-123 to in progress and add clusters-service component"
- **Search and retrieve issues** - "Show me open bugs assigned to me" or "Get details for PROJ-456" 
- **Manage comments** - "Add a comment to PROJ-123 about the fix being deployed", "Edit comment 123456", or "Delete the wrong comment"
- **Get user information** - "Who am I logged in as?"

Your AI assistant will automatically handle the technical details - no need to learn Jira's query language or API parameters.

## Usage Examples

Once configured in Claude Code, you can use natural language to interact with Jira:

### Create an issue:
"Create a new bug in project MYPROJ with the summary 'Fix login bug'
and description 'Users cannot log in with special characters' with high priority"

### Search issues:
"Search for all open issues in project MYPROJ" or "Find issues using JQL: project = MYPROJ AND assignee = currentUser()"

### Update issue:
"Update issue MYPROJ-123 to set the status to 'In Progress', add component 'frontend', and add label 'urgent'"

### Manage comments:
"Add a comment to issue MYPROJ-123 saying, 'Working on this now'"
"Edit comment 123456 to say 'Updated: Still working on this'"
"Delete comment 789012 - it was posted by mistake"

### Get user info:
"Who am I logged in as?" or "Get my current user information"

The MCP server will automatically translate these requests into the appropriate Jira API calls using the tool parameters below:

#### Tool Parameters Reference:
- **create_issue**: `{"project": "MYPROJ", "summary": "Fix login bug", "issueType": "Bug", "priority": "High"}`
- **search_issues**: `{"jql": "project = MYPROJ AND status = 'Open'", "maxResults": 25}`
- **update_issue**: `{"issueKey": "MYPROJ-123", "summary": "Updated summary", "status": "In Progress", "components": ["frontend"], "labels": ["urgent"]}`
- **add_comment**: `{"issueKey": "MYPROJ-123", "body": "Working on this now"}`
- **edit_comment**: `{"issueKey": "MYPROJ-123", "commentId": "123456", "body": "Updated comment"}`
- **delete_comment**: `{"issueKey": "MYPROJ-123", "commentId": "789012"}`
- **get_comments**: `{"issueKey": "MYPROJ-123"}`
- **get_current_user**: No parameters required

## Security

**Important:** This server requires API credentials to access your Jira instance. Please follow these security best practices:

- **Never commit API tokens to version control** - Always use environment variables
- **Use least-privilege access** - Create API tokens with minimal required permissions
- **Rotate tokens regularly** - Generate new API tokens periodically
- **Secure your environment** - Ensure your `.env` files and environment variables are properly secured
- **Review token scope** - Only grant access to projects and operations you need

## Requirements

- **Node.js**: Version 18.0.0 or higher
- **Jira Server**: Compatible with Jira Server instances (not Jira Cloud)
- **API Token**: Valid Jira API token for authentication

## Troubleshooting

### Connection Issues
- **ECONNREFUSED**: Check that your `JIRA_BASE_URL` is correct and accessible
- **SSL/TLS errors**: Verify your Jira server's SSL certificate configuration
- **Timeout errors**: Check network connectivity to your Jira server

### Authentication Issues
- **401 Unauthorized**: Verify your `JIRA_API_TOKEN` is valid and hasn't expired
- **403 Forbidden**: Check that your API token has sufficient permissions for the requested operation
- **Invalid credentials**: Ensure the API token is correctly copied (no extra spaces or characters)

### Common Setup Issues
- **Module not found**: Run `npm install` to install dependencies
- **Permission denied**: Check file permissions on the server.js file
- **Environment variables not loaded**: Ensure environment variables are properly set in your shell or MCP configuration

### Cursor-Specific Issues
- **"No tools or prompts" error**: 
  - Verify the file path in your MCP configuration is absolute and correct
  - Check Cursor's output panel for MCP server errors
  - Ensure Node.js is in your PATH and accessible from Cursor
  - Try restarting Cursor after configuration changes
- **MCP server not starting**:
  - Check that all file paths use forward slashes (even on Windows)
  - Verify environment variables are properly set in the configuration
  - Test the server manually: `node /path/to/server.js` to see any startup errors

### Getting Help
- Check the Jira Server logs for detailed error messages
- Verify API token permissions in your Jira admin panel
- For Cursor users: Check the MCP output panel in Cursor for detailed error logs
- Check the [detailed documentation](docs) for advanced troubleshooting

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Notes

- This server uses Jira REST API v2
- Authentication uses an API token
- Supports Jira Server (not Cloud-specific features)
- All responses are returned as JSON text