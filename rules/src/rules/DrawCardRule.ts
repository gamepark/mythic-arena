import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DrawCardRule extends PlayerTurnRule {
  onRuleStart() {
    return [
      this.material(MaterialType.PantheonCard)
        .location(LocationType.PantheonDeck)
        .player(this.player)
        .deck()
        .dealOne({
          type: LocationType.PlayerHand,
          player: this.player
        }),
      this.startRule(RuleId.PlaceCard)
    ]
  }
}
