/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { Memory } from '@gamepark/mythic-arena/rules/Memory'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlaceHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const secondChance = rules.remind(Memory.SecondChance) ?? false
  const discard = useLegalMove((move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDiscard)

  if (me === activePlayer) {
    if (!secondChance) {
      return (
        <Trans defaults="header.place-discard">
          <PlayMoveButton move={discard} />
        </Trans>
      )
    }
    return (
      <Trans defaults="header.place" />
    )
  }

  if (!secondChance) {
    return (
      <Trans defaults="header.place-discard.player" values={{ player}} />
    )
  }

  return (
    <Trans defaults="header.place.player" values={{ player}} />
  )

}
