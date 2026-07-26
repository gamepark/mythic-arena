import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCard, PantheonCardId } from '../../material/PantheonCard'
import { PantheonCardRule } from './PantheonCardRule'

export class Vali extends PantheonCardRule {
  afterBattle() {
    const card = this.effectCard
    if (!card.length) return []
    return card.deleteItems()
  }

  get effectCard() {
    return this.material(MaterialType.PantheonCard)
      .location(LocationType.Battlefield)
      .id(({ front }: PantheonCardId) => front === this.cardId)
  }

  get cardId() {
    return PantheonCard.Vali
  }
}
