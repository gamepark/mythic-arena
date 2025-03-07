/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const HeraclesSiegfriedHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)

  if (me === activePlayer) {
    return (
      <Trans
        defaults="header.heraclessiegfried"
        components={{
          openDiscard: <PlayMoveButton move={displayLocationHelp({ type: LocationType.PantheonDiscard, player: me }) } local/>
        }}
        local
      />
    )
  }

  return (
    <Trans defaults="header.heraclessiegfried.player" values={{ player }}/>
  )

}
