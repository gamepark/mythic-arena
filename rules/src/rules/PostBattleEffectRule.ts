import { PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class PostBattleEffectRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.startRule(RuleId.AllegianceScore)]
  }

  getPlayerMoves() {
    return []
  }
}
