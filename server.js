import app from "./src/app.js";

import { createServer } from "node:http";

const server = createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
