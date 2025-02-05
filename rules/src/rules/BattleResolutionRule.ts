import { PlayerTurnRule } from '@gamepark/rules-api'

export class BattleResolutionRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
