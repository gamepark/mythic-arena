import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { FC } from 'react'

export const PlayStrengthTokenHeader: FC = () => {
  const pass = useLegalMove((move) => isStartRule(move) && move.id === RuleId.BattleResolution)
  if (pass) {
    return (
      <PlayMoveButton move={pass}>
        Pass
      </PlayMoveButton>
    )
  }

  return <></>
}