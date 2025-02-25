import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCard } from '../../material/PantheonCard'
import { PantheonCardRule } from './PantheonCardRule'

export class Njord extends PantheonCardRule {

  get bonusPower() {
    if (this.index === this.placedCard) return 0
    return this.weakness? -5: 0
  }

  get weakness() {
    return this.battlefield
      .id(({ front }: any) => this.weaknessId === front)
      .length > 0
  }

  get weaknessId() {
    return PantheonCard.Odin
  }

  get battlefield() {
    return this
      .material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
  }
}
