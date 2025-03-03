import { Direction, getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { StrengthType } from '../material/StrengthType'
import { getCardRule } from './character/card.utils'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayStrengthTokenRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.getPlayerMoves().length) return [this.startRule(RuleId.BattleResolution)]
    return []
  }

  get power() {
    return this.material(MaterialType.Power)
      .location(LocationType.PlayerPower)
      .player(this.player)
  }

  get shatteredShield() {
    return this.material(MaterialType.ShatteredShield)
      .location(LocationType.PlayerShatteredShield)
      .player(this.player)
  }

  get placedCardIndex() {
    return this.remind<number>(Memory.PlacedCard)
  }

  get placedCard() {
    return this.material(MaterialType.PantheonCard)
      .getItem(this.placedCardIndex)!
  }

  get adjacentCardsWithShield() {
    const origin = this.origin
    const placedCardAllegiance = getCardRule(this.game, this.placedCardIndex)!.allegiance
    return this.battlefield
      .filter((item) => getDistanceBetweenSquares(origin, { x: item.location.x!, y: item.location.y! }) === 1)
      .filter((item, index) => {
        const directionWithOrigin = this.getDirectionWithOrigin(origin, item)
        const cardRule = getCardRule(this.game, index)!
        return cardRule.allegiance !== placedCardAllegiance && cardRule.hasShieldFor(directionWithOrigin)
      })
  }

  get origin() {
    const placedCard = this.placedCard
    return { x: placedCard.location.x!, y: placedCard.location.y! }
  }

  getDirectionWithOrigin(origin: XYCoordinates, item: MaterialItem) {
    if (item.location.x! > origin.x) return Direction.West
    if (item.location.x! < origin.x) return Direction.East
    if (item.location.y! > origin.y) return Direction.North
    return Direction.South
  }

  get battlefield() {
    return this.material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    moves.push(...this.placeShatteredShield())
    moves.push(...this.placePower())
    moves.push(this.startRule(RuleId.BattleResolution))
    return moves
  }

  placePower() {
    const tokens = this.power
    if (!tokens.getQuantity() || this.placedCardRule.power === 99) return []
    return [
      tokens.moveItem({
        type: LocationType.PantheonCardAllegiance,
        parent: this.placedCardIndex,
        id: StrengthType.Power
      })
    ]
  }

  placeShatteredShield() {
    const tokens = this.shatteredShield
    if (!tokens.getQuantity()) return []
    const origin = this.origin
    const adjacentCardsWithShield = this.adjacentCardsWithShield
    return adjacentCardsWithShield.getIndexes().map((index) => tokens.moveItem({
      type: LocationType.PantheonCardAllegiance,
      id: this.getDirectionWithOrigin(origin, adjacentCardsWithShield.getItem(index)),
      parent: index,
      rotation: StrengthType.ShatteredShield
    }))
  }

  get placedCardRule() {
    return getCardRule(this.game, this.placedCardIndex)!
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Power)(move) && !isMoveItemType(MaterialType.ShatteredShield)) return []
    if (!this.getPlayerMoves().length) return [this.startRule(RuleId.BattleResolution)]
    return [this.startRule(RuleId.BattleResolution)]
  }
}
