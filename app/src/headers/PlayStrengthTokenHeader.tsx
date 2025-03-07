/** @jsxImportSource @emotion/react */
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlayStrengthTokenHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const pass = useLegalMove((move) => isStartRule(move) && move.id === RuleId.BattleResolution)

  if (me === activePlayer) {
    return (
      <Trans
        defaults="header.play-strength"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}

      />
    )
  }

  return (
    <Trans defaults="header.play-strength.player" values={{ player }} />
  )

}
