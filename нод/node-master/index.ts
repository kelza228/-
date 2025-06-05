// index.ts
import dotenv from "dotenv";
import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import cors from "@elysiajs/cors";
import { Router } from "./Router";

class API {
  constructor() {
    dotenv.config();
    this.userMiddlewares();
    this.useRoutes();
    this.init().then(() => 
      console.log(`Server is running at: ${process.env.PORT || 5000}`)
    );
  }

  private app = new Elysia({ adapter: node() });

  private userMiddlewares() {
    this.app.use(cors());
  }

  private useRoutes() {
    this.app
      .group("/api/tickets", (app) => app.use(Router.tickets)) // Используем tickets вместо courses
      .get("/", () => ({
        status: "running",
        message: "API для управления билетами",
        endpoints: {
          tickets: {
            getAll: "GET /api/tickets",
            getOne: "GET /api/tickets/:id",
            create: "POST /api/tickets",
            update: "PATCH /api/tickets/:id",
            delete: "DELETE /api/tickets/:id"
          }
        }
      }));
  }

  async init() {
    this.app.listen(process.env.PORT || 5000);
  }
}

new API();