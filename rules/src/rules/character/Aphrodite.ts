import { MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { Freyja } from './Freyja'

export class Aphrodite extends Freyja {
  afterCardPlaced(): MaterialMove[] {
    return [this.startRule(RuleId.CaptureCard)]
  }
}
