import { PantheonCardRule } from './PantheonCardRule'

export class Sol extends PantheonCardRule {

  get canBeFifthCard() {
    return true
  }
}
