import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { PantheonCardRule } from './PantheonCardRule'

export class Hades extends PantheonCardRule {
  afterCardPlaced(): MaterialMove[] {
    return [this.startRule(RuleId.HelaHades)]
  }

  get isAutoDiscard(): boolean {
    if (this.item.location.type === LocationType.PlayerHand) {
      const discard = this
        .material(MaterialType.PantheonCard)
        .location(LocationType.PantheonDiscard)
        .player(this.item.location.player)

      if (!discard.length) return true
    }

    return false
  }
}
