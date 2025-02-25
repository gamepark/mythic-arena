/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import Glory from '../images/glory/glory-1.png'

export const PlayerPanels = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  const rules = useRules<MythicArenaRules>()!
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <StyledPlayerPanel
          key={player.id}
          player={player}
          css={[panelPosition, index === 0? leftPlayer: rightPlayer]}
          mainCounter={{
            image: Glory,
            value: rules.material(MaterialType.GloryPoint).player(player.id).getQuantity()
          }}
        />
      )}
    </>,
    root
  )
}
const panelPosition = css`
  position: absolute;
  top: ${8.5}em;
  width: 27em;
`

const leftPlayer = css`
  left: 1em;
`

const rightPlayer = css`
  right: 1em;
`
