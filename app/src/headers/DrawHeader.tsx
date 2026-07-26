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
      <Trans i18nKey="header.draw" />
    )
  }

  return (
    <Trans i18nKey="header.draw.player" values={{ player}} />
  )

}
