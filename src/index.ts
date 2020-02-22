/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import poemsRouter from './routes/poems';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

export const app = express();

/**
 *  App Configuration
 */
app.use(express.static("~/gw-client/build"))
app.use(helmet())
app.use(cors({origin: process.env.CORS}));
app.use(express.json());

app.use("/poems", poemsRouter)
app.get('*', (req,res) =>{
    res.sendFile('~/gw-client/public/index.html');
});

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
if (module.hot) {
   module.hot.accept();
   module.hot.dispose(() => server.close());
}
