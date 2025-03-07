import { faHand } from '@fortawesome/free-regular-svg-icons/faHand'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { ItemContext, ItemMenuButton, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import ShatteredShield from '../images/strength/shattered-shield.jpg'
import { ShatteredTokenHelp } from './help/ShatteredTokenHelp'

export class ShatteredShieldTokenDescription extends TokenDescription {
  height = 2.5
  width = 2.5
  image = ShatteredShield

  help = ShatteredTokenHelp

  menuAlwaysVisible = true

  getItemMenu(item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const takeToken = legalMoves.find((move) => isMoveItemType(MaterialType.ShatteredShield)(move) && move.location.type === LocationType.PlayerShatteredShield)
    if (item.location.type === LocationType.ShatteredShieldTokenStock && takeToken) {
      const quantity = context.rules.material(MaterialType.ShatteredShield).location(LocationType.ShatteredShieldTokenStock).getQuantity()
      console.log(context.displayIndex)
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

export const shatteredShieldTokenDescription = new ShatteredShieldTokenDescription()
