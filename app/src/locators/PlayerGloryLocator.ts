import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { playerHandLocator } from './PlayerHandLocator'

export class PlayerGloryLocator extends PileLocator {
  radius = 2

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = playerHandLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width / 2 - 4
    coordinates.y -= pantheonCardDescription.height * 2
    return coordinates
  }
}

export const playerGloryLocator = new PlayerGloryLocator()
