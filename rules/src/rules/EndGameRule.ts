import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BattlefieldHelper } from './helper/BattlefieldHelper'

export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
    const helper = new BattlefieldHelper(this.game, true)
    const majorityFor = helper.majorityFor
    const moves: MaterialMove[] = []
    if (majorityFor !== undefined) {

    moves.push(
      this.material(MaterialType.GloryPoint)
        .createItem({
          location: {
            type: LocationType.PlayerGlory,
            player: majorityFor
          },
          quantity: 3
        })
    )
    }

    moves.push(this.endGame())
    return moves
  }
}