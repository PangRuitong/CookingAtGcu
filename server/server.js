const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://www.gotcookedatgcu.com/' // Replace with your Vercel domain
})); // Enable CORS for your Vercel domain
app.use(express.json());

const CLIENT_ID = '866934536387-udvlu0vv09mlggdbr4kotn2t39ggmv8k.apps.googleusercontent.com'; // Replace with your Client ID
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}

app.post('/your_login_endpoint', async (req, res) => {
    try {
        const payload = await verify(req.body.token);
        console.log("User data:", payload);
        res.json({ message: 'Sign-in successful', user: payload });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});