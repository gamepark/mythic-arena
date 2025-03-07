import { isMoveItemType, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class TakeDiscardCardRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.discard.length) return [this.startRule(RuleId.PlayStrengthToken)]
    return []
  }

  getPlayerMoves() {
    return this.discard.moveItems({
      type: LocationType.PantheonDeck,
      player: this.player
    })
  }

  afterItemMove(move: MoveItem) {
    if (!isMoveItemType(MaterialType.PantheonCard)(move) || move.location.type !== LocationType.PantheonDeck) return []
    return [
      this.deck.shuffle(),
      this.startRule(RuleId.PlayStrengthToken)
    ]
  }

  get deck() {
    return this
      .material(MaterialType.PantheonCard)
      .player(this.player)
      .location(LocationType.PantheonDeck)
  }

  get discard() {
    return this
      .material(MaterialType.PantheonCard)
      .player(this.player)
      .location(LocationType.PantheonDiscard)
  }
}
