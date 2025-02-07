import { isMoveItemType, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './character/card.utils'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class HelaHadesRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.discard.length) return [this.startRule(RuleId.PlayStrengthToken)]
    return []
  }

  getPlayerMoves() {
    const card = this.playedCard
    return this.discard.moveItems({
      ...card.location,
      z: 1
    })
  }

  beforeItemMove(move: MoveItem) {
    if (!isMoveItemType(MaterialType.PantheonCard)(move) || move.location.type !== LocationType.Battlefield) return []
    const cardOnPlace = this.battlefield.filter((item) => item.location.x === move.location.x && item.location.y === move.location.y)
    if (!cardOnPlace.length) return []
    return cardOnPlace.deleteItems()
  }

  afterItemMove(move: MoveItem) {
    if (!isMoveItemType(MaterialType.PantheonCard)(move) || move.location.type !== LocationType.Battlefield) return []
    this.memorize(Memory.PlacedCard, move.itemIndex)
    const moves = getCardRule(this.game, move.itemIndex)?.afterCardPlaced() ?? []
    if (!moves.length) return [this.startRule(RuleId.PlayStrengthToken)]
    return moves
  }

  get playedCard() {
    return this.material(MaterialType.PantheonCard)
      .getItem(this.remind(Memory.PlacedCard))
  }

  get discard() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.PantheonDiscard)
      .player(this.player)
  }

  get battlefield() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }
}
