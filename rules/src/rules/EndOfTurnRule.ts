import { PlayerTurnRule } from '@gamepark/rules-api'

export class EndOfTurnRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
