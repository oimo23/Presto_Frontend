// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import mockUsers from '../../user/mockUsers'
import { User } from '../../user/type'

// type Data = {
//   id: number
//   name: string
//   part: Array<string>
//   age: number
// }

// const mockUsers: Array<Data> = [
//   {
//     id: 1,
//     name: 'Fushinuki',
//     part: ['drums'],
//     age: 30,
//   },
//   {
//     id: 2,
//     name: 'Abe',
//     part: ['guitar', 'bass'],
//     age: 30,
//   },
// ]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const { id } = req.query

  const targetUser = mockUsers.filter((user) => user.id === parseInt(id[0]))[0]
  res.status(200).json(targetUser)
}
