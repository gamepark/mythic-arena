import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCardRule } from './PantheonCardRule'

export class Ull extends PantheonCardRule {

  get bonusPower() {
    if (this.index !== this.placedCard) return 0
    return this.discard
  }

  get discard() {
    return this.material(MaterialType.PantheonCard)
      .location(LocationType.PantheonDiscard)
      .player(this.getActivePlayer())
      .length
  }
}
