/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { Memory } from '@gamepark/mythic-arena/rules/Memory'
import { Picture, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { powerTokenDescription } from '../material/PowerTokenDescription'
import { shatteredShieldTokenDescription } from '../material/ShatteredShieldTokenDescription'
import { headerIconCss } from './headerIconCss'

export const TakeStrengthTokenHeader = () => {
  const rules = useRules<MythicArenaRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = usePlayerId()
  const player = usePlayerName(activePlayer)
  const takePower = useLegalMove((move) => isMoveItemType(MaterialType.Power)(move) && move.location.type === LocationType.PlayerPower)
  const takeShattered = useLegalMove((move) => isMoveItemType(MaterialType.ShatteredShield)(move) && move.location.type === LocationType.PlayerShatteredShield)

  if (me === activePlayer) {
    return (
      <Trans defaults="header.take-strength" values={{ count: rules.remind(Memory.StrengthToken)}} components={{
        power: <TakePower move={takePower} />,
        shattered: <TakeShattered move={takeShattered} />
      }}>

      </Trans>
    )
  }

  return (
    <Trans defaults="header.take-strength.player" values={{ player, count: rules.remind(Memory.StrengthToken) }}/>
  )
}

const TakePower: FC<{move: MaterialMove }> = (props) => <PlayMoveButton move={props.move}><Picture css={headerIconCss} src={powerTokenDescription.image}/></PlayMoveButton>
const TakeShattered: FC<{move: MaterialMove }> = (props) => <PlayMoveButton move={props.move}><Picture css={headerIconCss} src={shatteredShieldTokenDescription.image}/></PlayMoveButton>
