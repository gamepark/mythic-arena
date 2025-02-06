import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PantheonDeckLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { rules, player } = context
    if (location.player === (player ?? rules.players[0])) {
      return { x: -37, y: 20 }
    }

    return { x: 29, y: 20 }
  }

  navigationSorts = []
}

export const pantheonDeckLocator = new PantheonDeckLocator()
