import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from './card.utils'
import { PantheonCardRule } from './PantheonCardRule'

export class Frigg extends PantheonCardRule {

  get bonusPower() {
    if (this.index !== this.placedCard) return 0
    return this.cardWithSameAllegiance
  }

  get cardWithSameAllegiance() {
    const battlefield = this.battlefield
    let count = 0
    for (const cardIndex of battlefield.getIndexes()) {
      const helper = getCardRule(this.game, cardIndex)!
      if (helper.allegiance === this.allegiance) count++;
    }

    return count
  }

  get battlefield() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }
}
