import { PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class PlayEffectRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.startRule(RuleId.PlayStrengthToken)]
  }

  getPlayerMoves() {
    return []
  }
}
