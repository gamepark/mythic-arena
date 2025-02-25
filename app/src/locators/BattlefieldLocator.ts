import { BattlefieldHelper } from '@gamepark/mythic-arena/rules/helper/BattlefieldHelper'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { BattlefieldDescription } from './description/BattlefieldDescription'


class BattlefieldLocator extends Locator {

  getLocations({ rules }: MaterialContext) {
    return new BattlefieldHelper(rules.game).availableSpaces
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { xMax, xMin, yMax, yMin } = new BattlefieldHelper(context.rules.game).boundaries
    const { x, y } = { x: 0, y: 0 }
    const deltaX = (xMin + xMax) / 2
    const deltaY = (yMin + yMax) / 2
    return {
      x: x + (location.x! - deltaX) * (pantheonCardDescription.width + 0.5),
      y: y + (location.y! - deltaY) * (pantheonCardDescription.height + 0.5),
      z:(location.z ?? 0) * 0.5
    }
  }

  getHoverTransform = () => {
    return ['translateZ(10em)', 'scale(2)']
  }

  locationDescription = new BattlefieldDescription()
}

export const battlefieldLocator = new BattlefieldLocator()
