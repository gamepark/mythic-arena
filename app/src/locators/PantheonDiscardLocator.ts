import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { pantheonDeckLocator } from './PantheonDeckLocator'

class PantheonDiscardLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = pantheonDeckLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width + 1
    return coordinates
  }
}

export const pantheonDiscardLocator = new PantheonDiscardLocator()
