import { PantheonCardRule } from './PantheonCardRule'

export class Tyr extends PantheonCardRule {
  get gloryPointBonus() {
    if (this.placedCard === this.index) return 1
    return 0
  }
}
