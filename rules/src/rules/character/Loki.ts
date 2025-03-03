import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Loki extends PantheonCardRule {
  afterBattle() {
    const quantity = this.tokenQuantities
    const wonTokens = Math.min(quantity, this.capturedCard.length)
    console.log(wonTokens)
    if (!wonTokens || !quantity || quantity < wonTokens) return []
    const activePlayer = this.game.rule?.player
    if (!activePlayer) return []
    
    this.memorize(Memory.StrengthToken, wonTokens)
    return [this.startRule(RuleId.TakeStrengthToken)]
  }

  get capturedCard() {
    return this.remind(Memory.CapturedCoordinates) ?? []
  }

  get tokenQuantities() {
    return this.material(MaterialType.Power).location(LocationType.PowerTokenStock).getQuantity()
    + this.material(MaterialType.ShatteredShield).location(LocationType.ShatteredShieldTokenStock).getQuantity()
  }
}
