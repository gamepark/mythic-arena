import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayStrengthTokenRule extends PlayerTurnRule {
  onRuleStart() {
    const tokens = this.strengthTokens
    if (!tokens.getQuantity()) return [this.startRule(RuleId.BattleResolution)]
    return []
  }

  get strengthTokens() {
    return this.material(MaterialType.StrengthToken)
      .location(LocationType.PlayerStrengthStock)
      .player(this.player)
  }

  get placedCardIndex() {
    return this.remind<number>(Memory.PlacedCard)
  }

  get placedCard() {
    return this.material(MaterialType.PantheonCard)
      .getItem(this.placedCardIndex)!
  }

  get adjacentCard() {
    const placedCard = this.placedCard
    const origin = { x: placedCard.location.x!, y: placedCard.location.y! }
    return this.battlefield
      .filter((item) => getDistanceBetweenSquares(origin, { x: item.location.x!, y: item.location.y! }) === 1)
  }

  get battlefield() {
    return this.material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const tokens = this.strengthTokens


    moves.push(
      ...this.adjacentCard.getIndexes().map((index) => tokens.moveItem({
        type: LocationType.PantheonCard,
        parent: index
      }))
    )


    moves.push(
      tokens.moveItem({
        type: LocationType.PantheonCard,
        parent: this.placedCardIndex,
        rotation: true
      })
    )


    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.StrengthToken)(move)) return []
    //if (!this.strengthTokens.getQuantity()) return [this.startRule(RuleId.BattleResolution)]
    return [this.startRule(RuleId.BattleResolution)]
  }
}
