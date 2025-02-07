import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Hades extends PantheonCardRule {
  afterCardPlaced(): MaterialMove[] {
    return [this.startRule(RuleId.HelaHades)]
  }
}
