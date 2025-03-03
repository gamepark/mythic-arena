/** @jsxImportSource @emotion/react */
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class MajorityGloryPointLocator extends Locator {

  getItemCoordinates(item: MaterialItem, context: MaterialContext): Partial<Coordinates> {
    if (item.id === (context.player ?? context.rules.players[0])) {
      return { x: -24, y: -19.5 }
    }

    return { x: -23, y: -18, z: 0.5 }
  }

  getHoverTransform() {
    return ['translateZ(1em)']
  }
}

export const majorityGloryPointLocator = new MajorityGloryPointLocator()
