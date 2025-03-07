import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});

export default { server, app };
