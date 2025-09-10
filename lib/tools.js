export const tools = [
  {
    name: 'create_issue',
    description: 'Create a new Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Project key (e.g., PROJ)',
        },
        summary: {
          type: 'string',
          description: 'Issue summary/title',
        },
        description: {
          type: 'string',
          description: 'Issue description',
        },
        issueType: {
          type: 'string',
          description: 'Issue type (e.g., Bug, Task, Story)',
          default: 'Task',
        },
        priority: {
          type: 'string',
          description: 'Priority (e.g., High, Medium, Low)',
        },
        assignee: {
          type: 'string',
          description: 'Assignee username',
        },
      },
      required: ['project', 'summary'],
    },
  },
  {
    name: 'get_issue',
    description: 'Get details of a specific Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'search_issues',
    description: 'Search for Jira issues using JQL',
    inputSchema: {
      type: 'object',
      properties: {
        jql: {
          type: 'string',
          description: 'JQL query string',
        },
        maxResults: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 50,
        },
      },
      required: ['jql'],
    },
  },
  {
    name: 'update_issue',
    description: 'Update an existing Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)',
        },
        summary: {
          type: 'string',
          description: 'New issue summary',
        },
        description: {
          type: 'string',
          description: 'New issue description',
        },
        priority: {
          type: 'string',
          description: 'New priority',
        },
        assignee: {
          type: 'string',
          description: 'New assignee username',
        },
        status: {
          type: 'string',
          description: 'New status (will attempt transition)',
        },
        components: {
          type: 'array',
          description: 'Array of component names',
          items: {
            type: 'string',
          },
        },
        labels: {
          type: 'array',
          description: 'Array of label names',
          items: {
            type: 'string',
          },
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'add_comment',
    description: 'Add a comment to a Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)',
        },
        body: {
          type: 'string',
          description: 'Comment text',
        },
      },
      required: ['issueKey', 'body'],
    },
  },
  {
    name: 'get_comments',
    description: 'Get comments for a Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'get_current_user',
    description: 'Get information about the current authenticated user',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'delete_comment',
    description: 'Delete a comment from a Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)',
        },
        commentId: {
          type: 'string',
          description: 'Comment ID to delete',
        },
      },
      required: ['issueKey', 'commentId'],
    },
  },
  {
    name: 'edit_comment',
    description: 'Edit an existing comment on a Jira issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Issue key (e.g., PROJ-123)',
        },
        commentId: {
          type: 'string',
          description: 'Comment ID to edit',
        },
        body: {
          type: 'string',
          description: 'New comment text',
        },
      },
      required: ['issueKey', 'commentId', 'body'],
    },
  },
];