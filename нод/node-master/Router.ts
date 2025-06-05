import { Elysia, t } from "elysia";
import { TicketController } from "./controllers/TicketController";

export class Router {
  static tickets = new Elysia()
    .post(
      "/",
      ({ body }) => TicketController.create({
        ...body,
        eventDate: new Date(body.eventDate)
      }),
      {
        body: t.Object({
          title: t.String(),
          description: t.String(),
          price: t.Number(),
          eventDate: t.String({ format: 'date-time' }),
        }),
      }
    )
    .get(
      "/:id",
      ({ params: { id } }) => TicketController.getById(Number(id)),
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
    .get("/", () => TicketController.getAll())
    .delete(
      "/:id",
      ({ params: { id } }) => TicketController.delete(Number(id)),
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
    .patch(
      "/:id",
      ({ params: { id }, body }) => {
        const updateData = {
          ...body,
          eventDate: body.eventDate !== undefined 
            ? body.eventDate !== null 
              ? new Date(body.eventDate)
              : null
            : undefined
        };
        return TicketController.update(Number(id), updateData);
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        body: t.Object({
          title: t.Optional(t.String()),
          description: t.Optional(t.String()),
          price: t.Optional(t.Number()),
          eventDate: t.Optional(t.Union([t.String({ format: 'date-time' }), t.Null()])),
        }),
      }
    );
}