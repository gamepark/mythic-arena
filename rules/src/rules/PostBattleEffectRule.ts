import { isStartRule, PlayerTurnRule } from '@gamepark/rules-api'
import { getCardRule } from './character/card.utils'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PostBattleEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const moves = getCardRule(this.game, this.placedCard)?.afterBattle() ?? []
    if (moves.some(isStartRule)) return moves
    moves.push(this.startRule(RuleId.AllegianceScore))
    return moves
  }

  get placedCard() {
    return this.remind<number>(Memory.PlacedCard)
  }
}
