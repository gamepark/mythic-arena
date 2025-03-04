import { Direction, directions, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './character/card.utils'
import { CaptureHelper } from './helper/CaptureHelper'
import { getOpposite } from './helper/direction.utils'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BattleResolutionRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const cardRule = this.cardRule
    for (const direction of directions) {
      const target = cardRule.getAdjacentInDirection(direction)
      if (!target.length) continue
      moves.push(
        ...this.resolveBattleAgainst(target, direction)
      )
    }

    moves.push(this.startRule(RuleId.PostBattleEffect))
    return moves
  }

  get card() {
    return this
      .material(MaterialType.PantheonCard)
      .index(this.placedCard)
  }

  get cardRule() {
    const card = this.card
    return getCardRule(this.game, card.getIndex())!
  }

  resolveBattleAgainst(target: Material, direction: Direction): MaterialMove[] {
    const moves: MaterialMove[] = []
    const cardRule = this.cardRule
    const targetRule = getCardRule(this.game, target.getIndex())!
    const oppositeDirection = getOpposite(direction)

    if (targetRule.allegiance === this.player) return []
    if (!cardRule.ignoreShields && targetRule.hasShieldFor(oppositeDirection)) return []

    const isWin = targetRule.hasFragilityFor(oppositeDirection) || cardRule.power > targetRule.power
    if (isWin) {
      const helper = new CaptureHelper(this.game)
      helper.persistCapturedCardCoordinates(target)
      return helper.captureCard(target)
    }

    return moves
  }

  get placedCard() {
    return this.remind<number>(Memory.PlacedCard)
  }



}

