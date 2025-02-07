import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Siegfried extends PantheonCardRule {
  afterCardPlaced(): MaterialMove[] {
    return [this.startRule(RuleId.TakeDiscardCard)]
  }
}
