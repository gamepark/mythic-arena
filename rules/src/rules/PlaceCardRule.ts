import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './character/card.utils'
import { BattlefieldHelper } from './helper/BattlefieldHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlaceCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const hand = this.hand

    if (this.canDiscard) {
      moves.push(...this.discardMove)
      const handIndex = this.hand.getIndex()
      if (getCardRule(this.game, handIndex)?.isAutoDiscard) {
        return moves
      }
    }

    for (const space of this.availableSpaces) {
      moves.push(
        hand.moveItem(space)
      )
    }

    return moves
  }

  get discardMove() {
    const hand = this.hand
    return [
        hand.moveItem({
          type: LocationType.PantheonDiscard,
          player: this.player
        })
    ]
  }

  get availableSpaces() {
    const hand = this.hand
    const cardRule = getCardRule(this.game, hand.getIndex())
    const canBeFifthCard = cardRule?.canBeFifthCard ?? false
    const spaces = new BattlefieldHelper(this.game).availableSpaces(canBeFifthCard)

    if (!canBeFifthCard) return spaces

    const battlefield = this.battlefield
    const littleTableau = new BattlefieldHelper(this.game).availableSpaces()
    return spaces.filter((space) => {
      const countOnLine = battlefield.filter((item) => item.location.y === space.y).length
      const countOnColumn = battlefield.filter((item) => item.location.x === space.x).length
      if (countOnLine === 4 || countOnColumn === 4) return true
      return littleTableau.some((s2) => isEqual(s2, space))
    })
  }

  get canDiscard() {
    return !this.remind(Memory.SecondChance)
  }

  get battlefield() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
      .getItems()
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.PantheonCard)(move)) return []
    if (move.location.type === LocationType.PantheonDiscard) {
      this.memorize(Memory.SecondChance, true)
      return [this.startRule(RuleId.DrawCard)]
    }

    if (move.location.type === LocationType.Battlefield) {
      const battlefield = this.battlefield
      const countOnLine = battlefield.filter((item) => item.location.y === move.location.y).length
      const countOnColumn = battlefield.filter((item) => item.location.x === move.location.x).length
      if (countOnLine === 5 || countOnColumn === 5) {
        this.memorize(Memory.FifthCards, (c: number[] = []) => {
          c.push(move.itemIndex)
          return c
        })
      }

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
