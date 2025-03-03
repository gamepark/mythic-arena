import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerGloryLocator } from './PlayerGloryLocator'

export class PlayerMajorityGloryLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = playerGloryLocator.getCoordinates(location, context)
    coordinates.x! -= 9
    return coordinates
  }
}

export const playerMajorityGloryLocator = new PlayerMajorityGloryLocator()
