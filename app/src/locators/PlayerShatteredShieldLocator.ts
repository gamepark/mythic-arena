import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { shatteredShieldTokenDescription } from '../material/ShatteredShieldTokenDescription'
import { pantheonDeckLocator } from './PantheonDeckLocator'

export class PlayerShatteredShieldLocator extends ListLocator {
  gap = { x: 3 }
  maxCount = 3

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = pantheonDeckLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width / 2 - 7
    coordinates.y -= pantheonCardDescription.height * 2
    coordinates.z = 0
    return coordinates
  }

  locationDescription = new DropAreaDescription({ height: 3.3, width: this.gap.x * 2 + shatteredShieldTokenDescription.width + 0.8  })
}

export const playerShatteredShieldLocator = new PlayerShatteredShieldLocator()
