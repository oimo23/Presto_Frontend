import { Position } from "./Position";

export type User = {
  userId: number
  name: string
  positions: Array<Position>
  age: number
}
