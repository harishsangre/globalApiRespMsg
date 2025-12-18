# node-api-response-kit

Production-ready standardized API response and error handling utilities for Node.js backends.

## Features
- Standardized success and error responses
- HTTP status helpers
- Express middleware for error handling
- Custom `AppError` class

## Installation
```bash
npm install node-api-response-kit
```

## Usage
```js
const {
  success,
  error,
  httpStatus,
  AppError,
  errorHandler,
  asyncHandler
} = require('node-api-response-kit');

// Example usage in Express
app.get('/api', asyncHandler(async (req, res) => {
  res.json(success('Data fetched', { foo: 'bar' }));
}));

app.use(errorHandler);
```

## API
- `success(message, data, statusCode)`
- `error(message, statusCode, errors)`
- `AppError(message, statusCode, errors)`
- `httpStatus`: HTTP status code constants
- `errorHandler`: Express error-handling middleware
- `asyncHandler(fn)`: Wrap async route handlers

## License
MIT
