const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your_secret_key';

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'employee', password: 'employee123', role: 'employee' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/validate-token', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ role: decoded.role });
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});