import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Siegfried extends PantheonCardRule {
  onPlaceCard(_move: MoveItem): MaterialMove[] {
    return [this.startRule(RuleId.TakeDiscardCard)]
  }
}
