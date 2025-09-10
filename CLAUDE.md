# Claude Configuration

This file contains configuration for Claude Code to help with development tasks.

## Commands

```bash
# Install dependencies
npm install

# Start the server
npm start

# Start the server with file watching for development
npm run dev

# Test server syntax
node server.js --help
```

## Environment Variables

The following environment variables are required:

- `JIRA_BASE_URL` - Your Jira server URL (replace with your actual server, e.g., https://jira.acme.com, https://acme-jira.example.com)
- `JIRA_API_TOKEN` - Your Jira API token

## Development Notes

- This is an MCP (Model Context Protocol) server for Jira integration
- Uses Jira REST API v2
- Server runs on stdio transport for MCP communication
- All tools return JSON responses wrapped in MCP content format

## Repository Structure

- `examples/` - Natural language workflow examples for users
- `docs/` - Technical documentation and API reference
- `.github/` - Issue templates and contributing guidelines