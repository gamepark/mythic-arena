import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand } from '@fortawesome/free-regular-svg-icons/faHand'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { ItemContext, ItemMenuButton, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Power1 from '../images/strength/power-1.jpg'
import { PowerTokenHelp } from './help/PowerTokenHelp'

export class PowerTokenDescription extends TokenDescription {
  height = 2.5
  width = 2.5
  image = Power1

  help = PowerTokenHelp

  menuAlwaysVisible = true

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const takeToken = legalMoves.find((move) => isMoveItemType(MaterialType.Power)(move) && move.location.type === LocationType.PlayerPower)
    if (item.location.type === LocationType.PowerTokenStock && takeToken) {
      const quantity = context.rules.material(MaterialType.Power).location(LocationType.PowerTokenStock).getQuantity()
      if (context.displayIndex !== ((quantity ?? 1) - 1)) return
      return (
        <>
          <ItemMenuButton
                          move={takeToken}
                          radius={2}
                          angle={180}>
            <FontAwesomeIcon icon={faHand}/>
          </ItemMenuButton>
          </>
      )
    }

    return
  }
}

export const powerTokenDescription = new PowerTokenDescription()
