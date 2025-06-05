import { TicketService } from "../TicketService";

export class TicketController {
  static async create({
    title,
    description,
    price,
    eventDate,
  }: {
    title: string;
    description: string;
    price: number;
    eventDate: Date;
  }) {
    return await TicketService.create({ title, description, price, eventDate });
  }

  static async getById(id: number) {
    const ticket = await TicketService.findById(id);
    if (!ticket) throw new Error("Билет не найден");
    return ticket;
  }

  static async getAll() {
    return await TicketService.findAll();
  }

  static async delete(id: number) {
    await TicketService.delete(id);
    return { message: "Билет удален" };
  }

  static async update(
  id: number,
  data: {
    title?: string;
    description?: string;
    price?: number;
    eventDate?: Date | null;
    }
  ) {
    return await TicketService.update(id, data);
  }
}