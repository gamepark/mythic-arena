import { BattlefieldHelper } from '@gamepark/mythic-arena/rules/helper/BattlefieldHelper'
import { PlaceCardRule } from '@gamepark/mythic-arena/rules/PlaceCardRule'
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { BattlefieldDescription } from './description/BattlefieldDescription'

class BattlefieldLocator extends Locator {

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    if (rules.game.rule?.id === RuleId.PlaceCard && rules.game.rule?.player === player) {
      return new PlaceCardRule(rules.game).availableSpaces
    }
    return super.getLocations(context)

  }

  getCoordinates(location: Location, _context: MaterialContext) {
    const boundaries = new BattlefieldHelper(_context.rules.game).innerSquareBoundaries
    const { x, y } = { x: 0, y: 0 }
    const computedX = location.x! - (boundaries.xMin + boundaries.xMax) / 2
    const computedY = location.y! - (boundaries.yMin + boundaries.yMax) / 2
    return {
      x: x + computedX * (pantheonCardDescription.width + 0.5),
      y: y + computedY * (pantheonCardDescription.height + 0.5),
      z:(location.z ?? 0) * 0.5
    }
  }

  getHoverTransform = () => {
    return ['translateZ(10em)', 'scale(2)']
  }

  locationDescription = new BattlefieldDescription()
}

export const battlefieldLocator = new BattlefieldLocator()
