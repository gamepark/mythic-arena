import { PantheonCardRule } from './PantheonCardRule'

export class Thor extends PantheonCardRule {

  get ignoreShields() {
    return true
  }
}
