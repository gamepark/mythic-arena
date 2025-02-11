import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCardRule } from './PantheonCardRule'

export class Freyr extends PantheonCardRule {
  afterBattle() {
    const tokens = this.strengthTokens
    if (!tokens.length) return []
    const activePlayer = this.game.rule?.player
    if (!activePlayer) return []
    return [
      this.strengthTokens
        .moveItem({
          type: LocationType.PlayerStrengthStock,
          player: activePlayer
        })
    ]
  }


  get strengthTokens() {
    return this.material(MaterialType.StrengthToken)
  }
}
