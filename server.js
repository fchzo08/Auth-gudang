const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'secret_key';

app.post('/api/getToken', (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).send('User ID is required');
    }
  
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/api/verifyToken', (req, res) => {
    const token = req.body.token;
    if (!token) {
      return res.status(401).send('Access denied. Token is required');
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).send('Access denied. Invalid token');
      }
      res.json({ userId: decoded.userId });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});