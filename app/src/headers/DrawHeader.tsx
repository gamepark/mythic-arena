/** @jsxImportSource @emotion/react */
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const DrawHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)

  if (me === activePlayer) {
    return (
      <Trans defaults="header.draw" />
    )
  }

  return (
    <Trans defaults="header.draw.player" values={{ player}} />
  )

}
