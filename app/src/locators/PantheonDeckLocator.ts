import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PantheonDeckLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { rules, player } = context
    if (location.player === (player ?? rules.players[0])) {
      return { x: -34, y: 10 }
    }

    return { x: 26, y: 10 }
  }

  navigationSorts = []
}

export const pantheonDeckLocator = new PantheonDeckLocator()
