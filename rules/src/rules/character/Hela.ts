import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { Frigg } from './Frigg'

export class Hela extends Frigg {
  onPlaceCard(_move: MoveItem): MaterialMove[] {
    return [this.startRule(RuleId.HelaHades)]
  }
}
