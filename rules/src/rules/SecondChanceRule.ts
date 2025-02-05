import { PlayerTurnRule } from '@gamepark/rules-api'

export class SecondChanceRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
