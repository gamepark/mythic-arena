import { BattlefieldHelper } from '@gamepark/mythic-arena/rules/helper/BattlefieldHelper'
import { PlaceCardRule } from '@gamepark/mythic-arena/rules/PlaceCardRule'
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialGame } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { BattlefieldDescription } from './description/BattlefieldDescription'

class BattlefieldLocator extends Locator {

  game?: MaterialGame
  deltaX?: number
  deltaY?: number

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    if (rules.game.rule?.id === RuleId.PlaceCard && rules.game.rule?.player === player) {
      return new PlaceCardRule(rules.game).availableSpaces
    }
    return super.getLocations(context)

  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { rules } = context
    if (rules.game !== this.game) {
      this.game = rules.game
      this.refreshDeltaPosition()
    }
    const { x, y } = { x: 0, y: 0 }
    const computedX = location.x! - this.deltaX!
    const computedY = location.y! - this.deltaY!
    return {
      x: x + computedX * (pantheonCardDescription.width + 0.5),
      y: y + computedY * (pantheonCardDescription.height + 0.5),
      z:(location.z ?? 0) * 0.5
    }
  }

  refreshDeltaPosition() {
    const boundaries = new BattlefieldHelper(this.game!).innerSquareBoundaries
    if (this.deltaX === undefined || boundaries.xMin - this.deltaX < -1.5 || boundaries.xMax - this.deltaX > 1.5) {
      this.deltaX = (boundaries.xMin + boundaries.xMax) / 2
    }

    if (this.deltaY === undefined || boundaries.yMin - this.deltaY < -1.5 || boundaries.yMax - this.deltaY > 1.5) {
      this.deltaY = (boundaries.yMin + boundaries.yMax) / 2
    }
  }

  getHoverTransform = () => {
    return ['translateZ(10em)', 'scale(2)']
  }

  locationDescription = new BattlefieldDescription()
}

export const battlefieldLocator = new BattlefieldLocator()
