require('dotenv').config();

const express = require('express');
const supabase = require('./supabase');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'FlyRank Auth API is running'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Connected to Supabase');
});