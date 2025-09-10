# Model Context Protocol (MCP)

This document explains how the Jira MCP Server implements the Model Context Protocol.

## What is MCP?

Model Context Protocol (MCP) is a standard for connecting AI assistants with external tools and data sources. It enables AI models to:

- Access external APIs and services
- Perform actions on behalf of users
- Retrieve and manipulate data
- Integrate with existing workflows

## Server Implementation

### Transport

The Jira MCP Server uses **stdio transport**:
- Input: JSON-RPC messages via stdin
- Output: JSON-RPC responses via stdout
- Errors: Logged to stderr

### Capabilities

The server announces these capabilities:
- **Tools**: All 7 Jira tools are available
- **Resources**: Not implemented
- **Prompts**: Not implemented

### Protocol Flow

1. **Initialization**:
   ```json
   {
     "jsonrpc": "2.0",
     "method": "initialize",
     "id": 1,
     "params": {
       "protocolVersion": "2024-11-05",
       "capabilities": {},
       "clientInfo": {
         "name": "claude-code",
         "version": "1.0.0"
       }
     }
   }
   ```

2. **Server Response**:
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "protocolVersion": "2024-11-05",
       "serverInfo": {
         "name": "jira-mcp-server",
         "version": "1.0.0"
       },
       "capabilities": {
         "tools": {}
       }
     }
   }
   ```

3. **Tool Listing**:
   ```json
   {
     "jsonrpc": "2.0",
     "method": "tools/list",
     "id": 2
   }
   ```

4. **Tool Execution**:
   ```json
   {
     "jsonrpc": "2.0",
     "method": "tools/call",
     "id": 3,
     "params": {
       "name": "create_issue",
       "arguments": {
         "project": "PROJ",
         "summary": "Test issue"
       }
     }
   }
   ```

## Tool Definitions

Each tool is defined with:
- **Name**: Unique identifier
- **Description**: What the tool does
- **Input Schema**: JSON Schema for parameters
- **Output**: Structured response format

### Example Tool Definition

```json
{
  "name": "create_issue",
  "description": "Create a new Jira issue",
  "inputSchema": {
    "type": "object",
    "properties": {
      "project": {
        "type": "string",
        "description": "Project key"
      },
      "summary": {
        "type": "string", 
        "description": "Issue summary"
      }
    },
    "required": ["project", "summary"]
  }
}
```

## Response Format

All tool responses follow this structure:

```json
{
  "content": [
    {
      "type": "text",
      "text": "JSON response or error message"
    }
  ]
}
```

### Success Response
```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"key\": \"PROJ-123\", \"id\": \"10001\"}"
    }
  ]
}
```

### Error Response
```json
{
  "content": [
    {
      "type": "text", 
      "text": "{\"error\": \"401 Unauthorized\", \"message\": \"Invalid API token\"}"
    }
  ]
}
```

## Client Integration

### Claude Code
- Automatic discovery of tools
- Natural language to tool mapping
- Error handling and retry logic

### Cursor
- Manual MCP configuration required
- JSON-based server definition
- Environment variable support

### Configuration Example

```json
{
  "mcpServers": {
    "jira-server": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "JIRA_BASE_URL": "https://jira.example.com",
        "JIRA_API_TOKEN": "your-token"
      }
    }
  }
}
```

## Error Handling

### Protocol Errors
- Invalid JSON-RPC format
- Missing required parameters
- Unknown methods

### Application Errors
- Jira API failures
- Authentication issues
- Network problems

### Error Response Format
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32000,
    "message": "Tool execution failed",
    "data": {
      "toolName": "create_issue",
      "error": "Invalid project key"
    }
  }
}
```

## Security Considerations

### Input Validation
- All parameters validated against JSON Schema
- SQL injection prevention (N/A - no SQL)
- Command injection prevention

### Authentication
- API tokens passed via environment variables
- No credential storage in server
- Secure token handling

### Output Sanitization
- No sensitive data in error messages
- Structured JSON responses only
- Logging excludes credentials

## Debugging

### Enable Debug Logging
Set environment variable:
```bash
DEBUG=mcp:* node server.js
```

### Common Issues

**Server Not Starting**:
- Check Node.js version (>=18.0.0)
- Verify file permissions
- Check for syntax errors

**Tools Not Available**:
- Verify initialization completed
- Check client MCP configuration
- Review server logs

**Tool Execution Fails**:
- Validate input parameters
- Check Jira connectivity
- Verify API token permissions

### Testing Protocol Manually

You can test the MCP protocol directly:

```bash
echo '{"jsonrpc":"2.0","method":"initialize","id":1,"params":{"protocolVersion":"2024-11-05","capabilities":{}}}' | node server.js
```

## Performance

### Latency
- Protocol overhead: ~1-5ms
- Jira API calls: 100-500ms
- Total response time: 100-600ms

### Throughput
- Single-threaded processing
- One request at a time
- No connection pooling

### Optimization
- Keep server process running
- Reuse HTTP connections to Jira
- Cache user information when possible