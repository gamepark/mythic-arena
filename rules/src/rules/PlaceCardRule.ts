import { PlayerTurnRule } from '@gamepark/rules-api'

export class PlaceCardRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
