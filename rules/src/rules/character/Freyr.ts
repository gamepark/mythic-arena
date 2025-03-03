import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Freyr extends PantheonCardRule {
  afterBattle() {
    const quantity = this.tokenQuantities
    if (!quantity) return []
    const activePlayer = this.game.rule?.player
    if (!activePlayer) return []
    this.memorize(Memory.StrengthToken, 1)
    return [this.startRule(RuleId.TakeStrengthToken)]
  }


  get tokenQuantities() {
    return this.material(MaterialType.Power).location(LocationType.PowerTokenStock).getQuantity()
      + this.material(MaterialType.ShatteredShield).location(LocationType.ShatteredShieldTokenStock).getQuantity()
  }
}
