# Contributing to Jira MCP Server

Thank you for your interest in contributing to the Jira MCP Server! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/jira-mcp-server.git
   cd jira-mcp-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your development environment with the required environment variables

## Development Setup

### Environment Variables
Create a `.env` file or set these environment variables:
- `JIRA_BASE_URL` - Your Jira server URL for testing
- `JIRA_API_TOKEN` - Your Jira API token for testing

### Running the Server
```bash
# Start the server
npm start

# Start with file watching for development
npm run dev

# Test server syntax
node server.js --help
```

## Making Changes

### Workflow
1. Create a feature branch from main:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test thoroughly (see Testing section below)
4. Commit with clear, descriptive messages
5. Push to your fork
6. Submit a pull request

### Code Guidelines
- **Code Style**: Follow existing code style and conventions
- **Comments**: Add comments for complex logic and non-obvious code
- **Error Handling**: Ensure proper error handling for all API calls
- **Documentation**: Update documentation for any new features or changes
- **Dependencies**: Avoid adding unnecessary dependencies

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Include the scope when relevant (e.g., "Fix authentication error handling")
- Keep the first line under 72 characters

## Testing

### Manual Testing
- Test all tools with various parameter combinations
- Verify error handling works correctly
- Check that responses are properly formatted as JSON
- Test with different Jira Server versions if possible

### Test Cases to Verify
1. **Authentication**:
   - Valid API token works
   - Invalid API token returns proper error
   - Missing credentials are handled gracefully

2. **Tools**:
   - `create_issue`: Test with required and optional parameters
   - `get_issue`: Test with valid and invalid issue keys
   - `search_issues`: Test various JQL queries
   - `update_issue`: Test field updates and status transitions
   - `add_comment` and `get_comments`: Test comment operations
   - `get_current_user`: Test user information retrieval

3. **Error Handling**:
   - Network connectivity issues
   - Invalid Jira server URLs
   - Malformed requests
   - Permission denied scenarios

### Testing with Real Jira Instance
Always test your changes against a real Jira Server instance to ensure compatibility:
```bash
JIRA_BASE_URL=https://your-test-jira.com \
JIRA_API_TOKEN=your-test-token \
npm start
```

## Reporting Issues

When reporting bugs or requesting features:

### Bug Reports
Include the following information:
- **Jira Server version** (if known)
- **Node.js version**: `node --version`
- **Operating system**
- **Error messages** (full stack traces when available)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**

### Feature Requests
- Describe the use case and problem being solved
- Provide examples of how the feature would be used
- Consider backwards compatibility
- Reference Jira REST API documentation when applicable

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

## Questions?

If you have questions about contributing:
- Check existing issues and discussions
- Open a new issue with the "question" label
- Be specific about what you're trying to accomplish

## Development Notes

- This project uses the Jira REST API v2
- The server communicates via stdio using the Model Context Protocol (MCP)
- All responses must be formatted as JSON text within MCP content blocks
- The server is designed for Jira Server instances (not Jira Cloud)

Thank you for contributing to make this project better! 🎉