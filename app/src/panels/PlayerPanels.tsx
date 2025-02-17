/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <StyledPlayerPanel key={player.id} player={player} css={[panelPosition, index === 0? leftPlayer: rightPlayer]}/>
      )}
    </>,
    root
  )
}
const panelPosition = css`
  position: absolute;
  top: ${8.5}em;
  width: 28em;
`

const leftPlayer = css`
  left: 1em;
`

const rightPlayer = css`
  right: 1em;
`
