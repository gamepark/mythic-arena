import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'

export const PantheonCardHelp: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog } = props
  const placeCard = useLegalMove((move) => isMoveItemType(MaterialType.PantheonCard)(move)
    && move.location.type === LocationType.Battlefield
    && move.itemIndex === itemIndex
  )

  if (placeCard) {
    return (
      <>
        <PlayMoveButton move={placeCard} onPlay={closeDialog}>
          Envoyer au casse pipe
        </PlayMoveButton>
      </>
    )
  }

  return (
    <></>
  )
}
