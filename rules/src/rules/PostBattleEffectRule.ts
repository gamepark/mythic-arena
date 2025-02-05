import { PlayerTurnRule } from '@gamepark/rules-api'

export class PostBattleEffectRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
