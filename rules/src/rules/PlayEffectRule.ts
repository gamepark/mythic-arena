import { PlayerTurnRule } from '@gamepark/rules-api'
import { getCardRule } from './character/card.utils'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const moves = getCardRule(this.game, this.placedCard)?.afterCardPlaced() ?? []
    if (!moves.length) return [this.startRule(RuleId.PlayStrengthToken)]
    return moves
  }

  get placedCard() {
    return this.remind<number>(Memory.PlacedCard)
  }
}
