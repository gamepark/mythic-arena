import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './character/card.utils'
import { TableauHelper } from './helper/TableauHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlaceCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const hand = this.hand

    if (this.canDiscard) {
      moves.push(
        hand.moveItem({
          type: LocationType.PantheonDiscard,
          player: this.player
        })
      )
    }

    const cardRule = getCardRule(this.game, hand.getIndex())
    const tableauSize = cardRule?.canBeFifthCard? 5: 4
    const spaces = new TableauHelper(this.game, tableauSize).availableSpaces
    for (const space of spaces) {
      moves.push(
        hand.moveItem(space)
      )
    }

    return moves
  }

  get canDiscard() {
    return !this.remind(Memory.SecondChance)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PantheonCard)(move)) return []
    if (move.location.type === LocationType.PantheonDiscard) {
      this.memorize(Memory.SecondChance, true)
      return [this.startRule(RuleId.DrawCard)]
    }

    if (move.location.type === LocationType.Battlefield) {
      this.memorize(Memory.PlacedCard, move.itemIndex)
      return [this.startRule(RuleId.PlayEffect)]
    }
    return []
  }

  get hand() {
    return this.material(MaterialType.PantheonCard)
      .location(LocationType.PlayerHand)
      .player(this.player)
  }
}
