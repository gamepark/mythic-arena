import { HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { pantheonDeckLocator } from './PantheonDeckLocator'

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = pantheonDeckLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width / 2 + 0.5
    coordinates.y -= pantheonCardDescription.height + 1
    return coordinates
  }
}

export const playerHandLocator = new PlayerHandLocator()
