import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class TakeStrengthTokenRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      this.power
        .moveItem({
          type: LocationType.PlayerPower,
          player: this.player,
        }, 1),
      this.shatteredShield
        .moveItem({
          type: LocationType.PlayerPower,
          player: this.player,
        }, 1),
    ]
  }

  afterItemMove(move: ItemMove) {
    if ((!isMoveItemType(MaterialType.Power)(move) && !isMoveItemType(MaterialType.ShatteredShield)(move)) || move.location.type !== LocationType.PlayerPower) return []
    this.memorize(Memory.StrengthToken, (t) => t - 1)
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