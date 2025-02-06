import { PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class PlayStrengthTokenRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.startRule(RuleId.BattleResolution)]
  }

  getPlayerMoves() {
    return []
  }
}
