import { DeckLocator, DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { pantheonCardDescription } from '../material/PantheonCardDescription'
import { DiscardHelp } from './help/DiscardHelp'
import { pantheonDeckLocator } from './PantheonDeckLocator'

class PantheonDiscardLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coordinates = pantheonDeckLocator.getCoordinates(location, context)
    coordinates.x += pantheonCardDescription.width + 1
    return coordinates
  }

  locationDescription = new PantheonDiscardDescription()
}

class PantheonDiscardDescription extends DropAreaDescription {
  constructor() {
    super(pantheonCardDescription)
  }

  help = DiscardHelp

}

export const pantheonDiscardLocator = new PantheonDiscardLocator()
