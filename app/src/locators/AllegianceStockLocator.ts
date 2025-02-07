import { DropAreaDescription, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { pantheonDeckLocator } from './PantheonDeckLocator'

export class AllegianceStockLocator extends PileLocator {
  radius = 2

  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = pantheonDeckLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width / 2 + 0.5
    coordinates.y -= pantheonCardDescription.height * 2 + 2
    return coordinates
  }


  locationDescription = new DropAreaDescription({ height: 15, width: 15 })
}

export const allegianceStockLocator = new AllegianceStockLocator()
