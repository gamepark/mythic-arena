import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gloryDescription } from '../material/GloryDescription'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { playerHandLocator } from './PlayerHandLocator'

export class PlayerGloryLocator extends ListLocator {
  gap = { x: gloryDescription.width + 0.3 }

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = playerHandLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width / 2 - 9
    coordinates.y -= pantheonCardDescription.height * 2
    return coordinates
  }

}

export const playerGloryLocator = new PlayerGloryLocator()
