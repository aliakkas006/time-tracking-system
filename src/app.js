import express from 'express';
import router from './routes/index.js';
import applyMiddleware from './middleware/index.js';

const app = express();
applyMiddleware(app);

app.use('/api/v1', router);

app.get('/health', (_req, res) => {
  res.send('Everything is OK!');
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
