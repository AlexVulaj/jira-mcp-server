#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { tools } from './lib/tools.js';
import {
  createIssue,
  getIssue,
  searchIssues,
  updateIssue,
  addComment,
  getComments,
  deleteComment,
  editComment,
  getCurrentUser,
} from './lib/jira-api.js';

const server = new Server(
  {
    name: 'jira-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_issue':
        return await createIssue(args);
      case 'get_issue':
        return await getIssue(args);
      case 'search_issues':
        return await searchIssues(args);
      case 'update_issue':
        return await updateIssue(args);
      case 'add_comment':
        return await addComment(args);
      case 'get_comments':
        return await getComments(args);
      case 'delete_comment':
        return await deleteComment(args);
      case 'edit_comment':
        return await editComment(args);
      case 'get_current_user':
        return await getCurrentUser(args);
      default:
        return {
          content: [
            {
              type: 'text',
              text: `Error: Unknown tool: ${name}`,
            },
          ],
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Jira MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});