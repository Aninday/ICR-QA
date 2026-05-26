const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// securely load credentials from environment variables
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

// Validate that all required environment variables are present
if (!clientID || !clientSecret || !refreshToken) {
  throw new Error('Missing required environment variables: CLIENT_ID, CLIENT_SECRET, or REFRESH_TOKEN');
}

// Initialize OAuth2 client with provided client credentials
const oauth2Client = new OAuth2Client(clientID, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

// Initialize the Gmail API with OAuth2 client authentication
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function getLabelId(labelName) {
  try {
    const response = await gmail.users.labels.list({ userId: 'me' });
    const labels = response.data.labels || [];
    const label = labels.find(l => l.name === labelName);

    if (!label) {
      throw new Error(`Label "${labelName}" not found.`);
    }

    return label.id;
  } catch (error) {
    throw new Error(`Error fetching labels: ${error.message}`);
  }
}

function decodeBody(data) {
  return Buffer.from(data, 'base64').toString('utf-8');
}

function extractResetLink(body) {
  const hrefMatch = body.match(/href=["'](https?:\/\/[^"']+)["']/i);
  if (hrefMatch) {
    return hrefMatch[1];
  }
  const urlMatch = body.match(/https?:\/\/[^\s"'<>]+/i);
  return urlMatch ? urlMatch[0] : null;
}

// Function to retrieve Gmail messages
async function getGmailMessages(to = '') {
  await new Promise(resolve => setTimeout(resolve, 7000));
  try {
    const labelId = await getLabelId('ICR');
    let query = 'from:info@carbonregistry.com';
    if (to) {
      query += ` to:${to}`;
    }
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 1,
      q: query,
      labelIds: [labelId]
    });
    const messages = response.data.messages || [];

    if (messages.length === 0) {
      throw new Error('No messages found from info@carbonregistry.com');
    }

    return await getMessageDetails(messages[0].id);
  } catch (error) {
    throw new Error(`Error fetching messages: ${error.message}`);
  }
}

async function getMessageDetails(messageId) {
  try {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
    });

    const message = response.data;
    const headers = message.payload.headers || [];
    const subject = headers.find(header => header.name === 'Subject')?.value || 'No Subject';

    let body = '';
    if (message.payload.parts) {
      const htmlPart = message.payload.parts.find(part => part.mimeType === 'text/html');
      const textPart = message.payload.parts.find(part => part.mimeType === 'text/plain');
      if (htmlPart?.body?.data) {
        body = decodeBody(htmlPart.body.data);
      } else if (textPart?.body?.data) {
        body = decodeBody(textPart.body.data);
      }
    } else if (message.payload.body?.data) {
      body = decodeBody(message.payload.body.data);
    }

    return { subject, body };
  } catch (error) {
    throw new Error(`Error fetching message details: ${error.message}`);
  }
}

async function getResetPasswordLink(to = '') {
  const { body } = await getGmailMessages(to);
  const link = extractResetLink(body);
  if (!link) {
    throw new Error('Could not find reset password link in email body.');
  }
  return link;
}

function generateTestEmail() {
  const newEmail = `aninday.mondal+test${Date.now()}@kreeti.com`;
  return newEmail;
}

module.exports = {
  generateTestEmail,
  getGmailMessages,
  getMessageDetails,
  getResetPasswordLink,
};