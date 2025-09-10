# Jira Integration

This document explains how the MCP server integrates with Jira Server instances.

## Jira REST API

The server uses Jira REST API v2 for all operations:

- **Base URL**: `{JIRA_BASE_URL}/rest/api/2/`
- **Authentication**: Bearer token (API token)
- **Content Type**: `application/json`
- **User Agent**: `jira-mcp-server/1.0.0`

## Authentication

### API Token Setup

1. **Generate API Token**:
   - Log into your Jira Server
   - Go to User Profile → Security → API Tokens
   - Create a new token with appropriate permissions

2. **Required Permissions**:
   - Browse Projects
   - Create Issues
   - Edit Issues
   - Add Comments
   - Transition Issues (for status changes)

3. **Security Considerations**:
   - Store tokens securely in environment variables
   - Never commit tokens to version control
   - Rotate tokens regularly
   - Use least-privilege access

## Supported Jira Versions

- **Jira Server**: 7.0 and later
- **Jira Data Center**: All versions
- **Jira Cloud**: Not supported (different authentication)

## API Endpoints Used

| Operation | Endpoint | Method |
|-----------|----------|---------|
| Create Issue | `/rest/api/2/issue` | POST |
| Get Issue | `/rest/api/2/issue/{key}` | GET |
| Update Issue | `/rest/api/2/issue/{key}` | PUT |
| Search Issues | `/rest/api/2/search` | GET |
| Add Comment | `/rest/api/2/issue/{key}/comment` | POST |
| Get Comments | `/rest/api/2/issue/{key}/comment` | GET |
| Get User | `/rest/api/2/myself` | GET |
| Transition Issue | `/rest/api/2/issue/{key}/transitions` | POST |

## Field Handling

### Standard Fields
- **summary**: Issue title (required for creation)
- **description**: Issue description
- **priority**: Priority object with name
- **assignee**: User object with name/key
- **status**: Status object (read-only, updated via transitions)
- **issuetype**: Issue type object with name

### Custom Fields
Custom fields are not directly supported but can be added by extending the server code.

### Field Validation
- Fields are validated by Jira Server
- Required fields vary by project configuration
- Invalid values return 400 errors with details

## Project Configuration

### Required Project Settings
- **Issue Types**: At least one issue type must be available
- **Priorities**: Standard priority scheme recommended
- **Workflows**: Must allow transitions for status updates
- **Permissions**: API user needs appropriate project permissions

### Recommended Setup
- Create a dedicated service account for API access
- Configure appropriate permission schemes
- Test with a non-production project first

## Error Handling

The server maps Jira API errors to meaningful responses:

### Network Errors
- Connection timeouts
- DNS resolution failures
- SSL certificate issues

### Authentication Errors
- Invalid API tokens
- Expired sessions
- Missing credentials

### Permission Errors
- Project access denied
- Operation not permitted
- Administrative restrictions

### Validation Errors
- Missing required fields
- Invalid field values
- Workflow constraint violations

## Performance Considerations

### Response Times
- Simple operations (get issue): ~100-300ms
- Search operations: ~200-500ms (depends on query complexity)
- Bulk operations: Varies significantly

### Optimization Tips
- Use specific JQL queries to reduce search time
- Limit `maxResults` for large searches
- Cache user information when possible
- Batch operations when updating multiple issues

### Rate Limiting
- Jira Server may implement rate limiting
- No client-side throttling implemented
- Consider adding delays for bulk operations

## Troubleshooting

### Common Issues

**Connection Refused**:
- Verify `JIRA_BASE_URL` is correct
- Check network connectivity
- Verify Jira Server is running

**SSL Errors**:
- Check certificate validity
- Verify hostname matches certificate
- Consider certificate trust issues

**Authentication Failures**:
- Verify API token is valid
- Check token hasn't expired
- Ensure user account is active

**Permission Denied**:
- Verify project permissions
- Check issue-level security
- Review workflow permissions

### Debugging Tips

1. **Test Basic Connectivity**:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        https://your-jira-server.com/rest/api/2/myself
   ```

2. **Check Project Access**:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        https://your-jira-server.com/rest/api/2/project/PROJECTKEY
   ```

3. **Validate Issue Operations**:
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        https://your-jira-server.com/rest/api/2/issue/ISSUE-123
   ```

## Integration Examples

### Issue Creation Flow
1. User requests issue creation via AI assistant
2. MCP server validates required fields
3. POST request sent to Jira API
4. Response includes new issue key
5. Success/error returned to AI assistant

### Search Flow
1. User describes search criteria in natural language
2. AI assistant converts to JQL query
3. MCP server executes search via Jira API
4. Results formatted and returned
5. AI assistant presents results to user

### Status Update Flow
1. User requests status change
2. MCP server gets available transitions
3. Matching transition executed
4. Issue updated in Jira
5. Confirmation returned to user