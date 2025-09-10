import axios from 'axios';

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

if (!JIRA_BASE_URL || !JIRA_API_TOKEN) {
  console.error('Missing required environment variables: JIRA_BASE_URL, JIRA_API_TOKEN');
  process.exit(1);
}

const jiraApi = axios.create({
  baseURL: `${JIRA_BASE_URL}/rest/api/2`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JIRA_API_TOKEN}`,
  },
});

export async function createIssue(args) {
  const issueData = {
    fields: {
      project: { key: args.project },
      summary: args.summary,
      description: args.description || '',
      issuetype: { name: args.issueType || 'Task' },
    },
  };

  if (args.priority) {
    issueData.fields.priority = { name: args.priority };
  }

  if (args.assignee) {
    issueData.fields.assignee = { name: args.assignee };
  }

  const response = await jiraApi.post('/issue', issueData);
  
  return {
    content: [
      {
        type: 'text',
        text: `Issue created successfully: ${response.data.key}\nURL: ${JIRA_BASE_URL}/browse/${response.data.key}`,
      },
    ],
  };
}

export async function getIssue(args) {
  const response = await jiraApi.get(`/issue/${args.issueKey}`);
  const issue = response.data;

  const result = {
    key: issue.key,
    summary: issue.fields.summary,
    description: issue.fields.description || 'No description',
    status: issue.fields.status.name,
    priority: issue.fields.priority?.name || 'None',
    assignee: issue.fields.assignee?.displayName || 'Unassigned',
    reporter: issue.fields.reporter?.displayName || 'Unknown',
    created: issue.fields.created,
    updated: issue.fields.updated,
    url: `${JIRA_BASE_URL}/browse/${issue.key}`,
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export async function searchIssues(args) {
  const params = {
    jql: args.jql,
    maxResults: args.maxResults || 50,
    fields: 'key,summary,status,priority,assignee,created,updated',
  };

  const response = await jiraApi.get('/search', { params });
  const formattedIssues = response.data.issues.map(issue => ({
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status.name,
    priority: issue.fields.priority?.name || 'None',
    assignee: issue.fields.assignee?.displayName || 'Unassigned',
    created: issue.fields.created,
    updated: issue.fields.updated,
    url: `${JIRA_BASE_URL}/browse/${issue.key}`,
  }));

  return {
    content: [
      {
        type: 'text',
        text: `Found ${response.data.total} issues (showing ${formattedIssues.length}):\n\n${JSON.stringify(formattedIssues, null, 2)}`,
      },
    ],
  };
}

export async function updateIssue(args) {
  const updateData = { fields: {} };

  if (args.summary) updateData.fields.summary = args.summary;
  if (args.description) updateData.fields.description = args.description;
  if (args.priority) updateData.fields.priority = { name: args.priority };
  if (args.assignee) updateData.fields.assignee = { name: args.assignee };
  if (args.components) updateData.fields.components = args.components.map(name => ({ name }));
  if (args.labels) updateData.fields.labels = args.labels;

  await jiraApi.put(`/issue/${args.issueKey}`, updateData);

  if (args.status) {
    try {
      const transitionsResponse = await jiraApi.get(`/issue/${args.issueKey}/transitions`);
      const availableTransitions = transitionsResponse.data.transitions;
      const transition = availableTransitions.find(
        t => t.to.name.toLowerCase() === args.status.toLowerCase()
      );
      
      if (transition) {
        await jiraApi.post(`/issue/${args.issueKey}/transitions`, {
          transition: { id: transition.id },
        });
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `Issue updated, but status change failed: Status transition to '${args.status}' not available`,
            },
          ],
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Issue updated, but status change failed: ${error.message}`,
          },
        ],
      };
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: `Issue ${args.issueKey} updated successfully`,
      },
    ],
  };
}

export async function addComment(args) {
  const commentData = {
    body: args.body,
  };

  const response = await jiraApi.post(`/issue/${args.issueKey}/comment`, commentData);

  return {
    content: [
      {
        type: 'text',
        text: `Comment added to ${args.issueKey}: ${response.data.id}`,
      },
    ],
  };
}

export async function getComments(args) {
  const response = await jiraApi.get(`/issue/${args.issueKey}/comment`);
  const comments = response.data.comments.map(comment => ({
    id: comment.id,
    author: comment.author.displayName,
    body: comment.body,
    created: comment.created,
    updated: comment.updated,
  }));

  return {
    content: [
      {
        type: 'text',
        text: `Comments for ${args.issueKey}:\n\n${JSON.stringify(comments, null, 2)}`,
      },
    ],
  };
}

export async function deleteComment(args) {
  await jiraApi.delete(`/issue/${args.issueKey}/comment/${args.commentId}`);

  return {
    content: [
      {
        type: 'text',
        text: `Comment ${args.commentId} deleted from ${args.issueKey}`,
      },
    ],
  };
}

export async function editComment(args) {
  const commentData = {
    body: args.body,
  };

  await jiraApi.put(`/issue/${args.issueKey}/comment/${args.commentId}`, commentData);

  return {
    content: [
      {
        type: 'text',
        text: `Comment ${args.commentId} updated in ${args.issueKey}`,
      },
    ],
  };
}

export async function getCurrentUser() {
  const response = await jiraApi.get('/myself');
  const user = response.data;

  const result = {
    username: user.name,
    displayName: user.displayName,
    emailAddress: user.emailAddress,
    accountId: user.accountId,
    active: user.active,
    timeZone: user.timeZone,
    locale: user.locale,
    groups: user.groups?.items?.map(group => group.name) || [],
    avatarUrls: user.avatarUrls,
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}