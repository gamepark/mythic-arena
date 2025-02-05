import { PlayerTurnRule } from '@gamepark/rules-api'

export class PlayEffectRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
