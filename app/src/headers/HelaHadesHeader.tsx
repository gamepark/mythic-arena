/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { PlayMoveButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const HelaHadesHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const { t } = useTranslation()

  const card = activePlayer === PantheonType.Greek ? PantheonCard.Hades : PantheonCard.Hela
  if (me === activePlayer) {
    return (
      <Trans
        defaults="header.helahades"
        values={{ card: t(`card.${card}`) }}
        components={{
          openDiscard: <PlayMoveButton move={displayLocationHelp({
            type: LocationType.PantheonDiscard,
            player: me
          })} local/>
        }}/>
    )
  }

  return (
    <Trans defaults="header.helahades.player" values={{ player, card: t(`card.${card}`) }}/>
  )

}
