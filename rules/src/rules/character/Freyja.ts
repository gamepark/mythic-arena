import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Freyja extends PantheonCardRule {

  onPlaceCard(_move: MoveItem): MaterialMove[] {
    return [this.startRule(RuleId.CaptureCard)]
  }
}
