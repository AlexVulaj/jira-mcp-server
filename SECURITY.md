# Security Policy

## Supported Versions

As an educational project, only the latest version of this repository is supported for security updates.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

## Reporting a Vulnerability

### How to Report

Please report security vulnerabilities through [GitHub Security Advisories](https://github.com/AlexVulaj/jira-mcp-server/security/advisories/new). This allows for private disclosure and coordinated response.

**Do NOT report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

### What to Include

When reporting a vulnerability, please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes or mitigations (if known)

### Scope

This security policy covers:

- **MCP Server Code**: Vulnerabilities in the server implementation, authentication handling, and API interactions
- **Dependencies**: Security issues in third-party libraries and packages
- **Documentation**: Configuration examples or instructions that could lead to security misconfigurations

### Response Expectations

**Important Notice**: This is an educational project maintained on a volunteer basis. While security reports are appreciated and will be reviewed, **no SLA or timeline guarantees are provided** for acknowledgment, response, or resolution.

### Contact

For questions about this security policy, contact [@AlexVulaj](https://github.com/AlexVulaj).

## Security Best Practices

When using this MCP server:

- **Never commit API tokens** to version control
- **Use environment variables** for sensitive configuration
- **Regularly rotate API tokens** 
- **Apply principle of least privilege** when creating Jira API tokens
- **Keep dependencies updated** by running `npm audit` and `npm update`
- **Review permissions** granted to the MCP server in your Jira instance