import { Direction, getSquareInDirection, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCard } from '../../material/PantheonCard'
import { PantheonCardsCharacteristics } from '../../material/PantheonCardCharacteristics'
import { Memory } from '../Memory'

export class PantheonCardRule extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly index: number) {
    super(game)
  }

  get item(): MaterialItem {
    return this.game.items[MaterialType.PantheonCard]![this.index]!
  }

  get allegiance() {
    const item = this.item
    if (item.id?.front === undefined) return null
    const characteristics = this.characteristics
    const baseAllegiance = characteristics.allegiance
    const allegianceToken = this
      .material(MaterialType.AllegianceToken)
      .parent(this.index)

    if (allegianceToken.length) return allegianceToken.getItem()!.id
    return baseAllegiance
  }

  get characteristics() {
    return PantheonCardsCharacteristics[this.item.id.front as PantheonCard]
  }

  get power() {
    const item = this.item
    if (item.id?.front === undefined) return 0
    const characteristics = this.characteristics
    const basePower = characteristics.power
    const powerToken = this
      .material(MaterialType.Power)
      .parent(this.index)
      .location(LocationType.PantheonCardPower)
      .length

    return basePower + powerToken + this.bonusPower
  }

  hasShieldFor(direction: Direction) {
    const item = this.item
    if (item.id?.front === undefined) return false
    const characteristics = this.characteristics
    return characteristics
      .shieldFor
      .filter((direction) => !this.isShatteredShield(direction))
      .includes(direction)
  }

  isShatteredShield(direction: Direction) {
    return this
      .material(MaterialType.ShatteredShield)
      .parent(this.index)
      .location(LocationType.PantheonCardShatteredShield)
      .locationId(direction)
      .length > 0
  }

  hasFragilityFor(direction: Direction) {
    const item = this.item
    if (item.id?.front === undefined) return false
    const characteristics = this.characteristics
    return characteristics.fragilityFor.includes(direction)
  }

  get battlefield() {
    return this.material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }

  get coordinates() {
    const item = this.item
    return {
      x: item.location.x!,
      y: item.location.y!
    }
  }

  getAdjacentInDirection(direction: Direction) {
    return this.battlefield
      .filter((item) => {
        const adjacentCoordinates = getSquareInDirection(this.coordinates, direction)
        return item.location.x === adjacentCoordinates.x && item.location.y === adjacentCoordinates.y
      })
  }

  get bonusPower(): number {
    return 0
  }

  afterCardPlaced(): MaterialMove[] {
    return []
  }

  afterBattle(): MaterialMove[] {
    return []
  }

  get canBeFifthCard(): boolean {
    return false
  }

  get placedCard() {
    return this.remind<number>(Memory.PlacedCard)
  }

  get ignoreShields() {
    return false
  }

  get countAs() {
    return 1
  }

  get isAutoDiscard() {
    return false
  }

  get gloryPointBonus() {
    return 0
  }
}
