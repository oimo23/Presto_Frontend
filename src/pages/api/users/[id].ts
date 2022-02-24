// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import mockUsers from '../../../modules/mock/mockUsers'
import { User } from '../../../modules/types/User'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const { id } = req.query

  const targetUser = mockUsers.filter((user) => user.id === parseInt(id[0]))[0]
  res.status(200).json(targetUser)
}
