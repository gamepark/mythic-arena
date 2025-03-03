import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { pantheonDeckLocator } from './PantheonDeckLocator'

export class PlayerPowerLocator extends ListLocator {
  gap = { y: 3}
  maxCount = 3
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = pantheonDeckLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width / 2 - 4
    coordinates.y -= pantheonCardDescription.height * 2 + 2
    coordinates.z = 0
    return coordinates
  }


  locationDescription = new DropAreaDescription({ height: 3, width: 3 })
}

export const playerPowerLocator = new PlayerPowerLocator()
