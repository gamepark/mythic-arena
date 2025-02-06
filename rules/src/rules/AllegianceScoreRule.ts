import { PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from './RuleId'

export class AllegianceScoreRule extends PlayerTurnRule {
  onRuleStart() {
    return [this.startRule(RuleId.EndOfTurn)]
  }
  getPlayerMoves() {
    return []
  }
}
