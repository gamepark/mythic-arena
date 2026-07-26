import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

export function GameDisplay() {
  return (
    <>
      <GameTable
        xMin={-50}
        xMax={50}
        yMin={-28}
        yMax={28}
        margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation css={navigationCss} />
        <PlayerPanels />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)" />}
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`

const navigationCss = css`
  position: absolute;
  left: 1em;
  top: 18em;
`
