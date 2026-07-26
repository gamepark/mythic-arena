import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { useAnimation, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CreateItem, isCreateItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const AllegianceScoreHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const animation = useAnimation<CreateItem>((animation) => isCreateItemType(MaterialType.GloryPoint)(animation.move))
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const won = animation?.move?.item.quantity ?? 0
  if (!animation) return null

  if (me === activePlayer) {
    return (
      <Trans i18nKey="header.glory" values={{ count: won }}/>
    )
  }

  return (
    <Trans i18nKey="header.glory.player" values={{ player, count: won }}/>
  )

}
