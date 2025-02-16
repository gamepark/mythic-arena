import { Direction } from '@gamepark/rules-api'
export const getOpposite = (direction: Direction) => {
  if (direction === Direction.East) return Direction.West
  if (direction === Direction.West) return Direction.East
  if (direction === Direction.North) return Direction.South
  return Direction.North
}