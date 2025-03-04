/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import Glory from '../images/glory/glory-1.png'
import Norse from '../images/panel/norse.jpg'
import Greek from '../images/panel/greek.jpg'

export const PlayerPanels = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  const rules = useRules<MythicArenaRules>()!
  if (!root) {
    return null
  }


  return createPortal(
    <>
      {players.map((player, index) => {
        const hasMajority = rules.material(MaterialType.MajorityGloryPoint).location(LocationType.PlayerMajorityGlory).player(player.id).length > 0
        const score = rules.material(MaterialType.GloryPoint).player(player.id).getQuantity() + (hasMajority? 3: 0)
          return <StyledPlayerPanel
            key={player.id}
            backgroundImage={player.id === PantheonType.Greek? Greek: Norse}
            player={player}
            css={[panelPosition, index === 0 ? leftPlayer : rightPlayer]}
            mainCounter={{
              image: Glory,
              value: score
            }}
          />
        }
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
