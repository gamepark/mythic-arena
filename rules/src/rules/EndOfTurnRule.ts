import { PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.startPlayerTurn(RuleId.DrawCard, this.nextPlayer)]
  }

  getPlayerMoves() {
    return []
  }

  onRuleEnd() {
    this.forget(Memory.SecondChance)
    return []
  }
}
