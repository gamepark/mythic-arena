import { PlayerTurnRule } from '@gamepark/rules-api'

export class DrawCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
