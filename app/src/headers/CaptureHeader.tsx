/** @jsxImportSource @emotion/react */
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const CaptureHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)

  if (me === activePlayer) {
    return (
      <Trans defaults="header.capture" />
    )
  }

  return (
    <Trans defaults="header.capture.player" values={{ player}} />
  )

}
