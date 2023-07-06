import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { toolValidationSchema } from 'validationSchema/tools';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTools();
    case 'POST':
      return createTool();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTools() {
    const data = await prisma.tool
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'tool'));
    return res.status(200).json(data);
  }

  async function createTool() {
    await toolValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.rental_transaction?.length > 0) {
      const create_rental_transaction = body.rental_transaction;
      body.rental_transaction = {
        create: create_rental_transaction,
      };
    } else {
      delete body.rental_transaction;
    }
    const data = await prisma.tool.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
