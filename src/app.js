import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(routes);

app.get('/health', (_req, res) => {
  res.send('Everything is OK!');
});

// Global error handler
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
