import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TicketService = {
  async create(data: {
    title: string;
    description: string;
    price: number;
    eventDate: Date;
  }) {
    return await prisma.ticket.create({ data });
  },

  async findById(id: number) {
    return await prisma.ticket.findUnique({ where: { id } });
  },

  async findAll() {
    return await prisma.ticket.findMany();
  },

  async delete(id: number) {
    return await prisma.ticket.delete({ where: { id } });
  },

  async update(
  id: number,
  data: {
    title?: string;
    description?: string;
    price?: number;
    eventDate?: Date | null; 
  }
  ) {
    return await prisma.ticket.update({
      where: { id },
      data,
    });
  },
};