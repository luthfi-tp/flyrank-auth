require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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