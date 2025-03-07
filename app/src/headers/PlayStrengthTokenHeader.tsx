/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
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
  const power = rules.material(MaterialType.Power).location(LocationType.PlayerPower).player(activePlayer).getQuantity()
  const shattered = rules.material(MaterialType.ShatteredShield).location(LocationType.PlayerShatteredShield).player(activePlayer).getQuantity()
  const hasToken = power + shattered > 0

  if (me === activePlayer) {
    if (!hasToken) {
      return (
        <Trans
          defaults="header.pass"
          components={{
            pass: <PlayMoveButton move={pass} auto={5} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults="header.play-strength"
        components={{
          pass: <PlayMoveButton move={pass} />
        }}

      />
    )
  }

  if (!hasToken) {
    return (
      <Trans defaults="header.pass.player" values={{ player }} />
    )
  }

  return (
    <Trans defaults="header.play-strength.player" values={{ player }} />
  )

}
