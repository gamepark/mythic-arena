import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { Hela } from './Hela'

export class Hades extends Hela {
  onPlaceCard(_move: MoveItem): MaterialMove[] {
    return [this.startRule(RuleId.HelaHades)]
  }
}
