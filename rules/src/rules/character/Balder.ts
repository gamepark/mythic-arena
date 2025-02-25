import { PantheonCardRule } from './PantheonCardRule'

export class Balder extends PantheonCardRule {
  get countAs(): number {
    if (this.allegiance === this.characteristics.allegiance) return 2
    return 1
  }
}