import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './character/card.utils'
import { CaptureHelper } from './helper/CaptureHelper'
import { RuleId } from './RuleId'

export class CaptureCardRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.cardWithOpponentAllegiance.length) return [this.startRule(RuleId.PlayStrengthToken)]
    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const cards = this.cardWithOpponentAllegiance
    const moves: MaterialMove[] = []

    const helper = new CaptureHelper(this.game)
    for (const index of cards.getIndexes()) {
      moves.push(...helper.captureCard(cards.index(index)))
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.AllegianceToken)(move)) return []
    if (move.location.type === LocationType.PantheonCardAllegiance) {
      const card = this.material(MaterialType.PantheonCard).index(move.location.parent!)
      new CaptureHelper(this.game).persistCapturedCardCoordinates(card)
    }

    return [this.startRule(RuleId.PlayStrengthToken)]
  }

  get cardWithOpponentAllegiance() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
      .filter((_, index) => getCardRule(this.game, index)?.allegiance !== this.player)
  }
}
