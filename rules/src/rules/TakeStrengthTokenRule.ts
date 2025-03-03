import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class TakeStrengthTokenRule extends PlayerTurnRule {
  getPlayerMoves() {
    const power = this.power
    const moves: MaterialMove[] = []
    if (power.getQuantity()) {
      moves.push(
        this.power
          .moveItem({
            type: LocationType.PlayerPower,
            player: this.player,
          }, 1)
      )
    }

    const shattered = this.shatteredShield
    if (shattered.getQuantity()) {
      moves.push(
        this.shatteredShield
          .moveItem({
            type: LocationType.PlayerShatteredShield,
            player: this.player,
          }, 1)
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Power)(move) && !isMoveItemType(MaterialType.ShatteredShield)(move)) return []
    if (move.location.type !== LocationType.PlayerPower && move.location.type !== LocationType.PlayerShatteredShield) return []
    this.memorize(Memory.StrengthToken, (t: number) => t - 1)
    if (!this.remind(Memory.StrengthToken)) return [this.startRule(RuleId.AllegianceScore)]
    return []
  }

  get power() {
    return this.material(MaterialType.Power)
      .location(LocationType.PowerTokenStock)
  }

  get shatteredShield() {
    return this.material(MaterialType.ShatteredShield)
      .location(LocationType.ShatteredShieldTokenStock)
  }
}
