/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const DiscardHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const name = usePlayerName(location.player)
  const cards = useRules<MythicArenaRules>()?.material(MaterialType.PantheonCard).location(LocationType.PantheonDiscard).player(location.player)
    .sort(item => -item.location.x!)
  const play = usePlay()
  return <>
    <h2>{t('help.discard', { player: name })}</h2>
    <p>
      {t('help.discard.count', { number: cards?.length, player: name })}
    </p>
    <ol css={grid}>
      {cards?.entries.map(([index, card]) =>
        <li key={index}>
          <MaterialComponent
            type={MaterialType.PantheonCard}
            itemId={card.id}
            css={pointerCursorCss}
            onClick={() => play(displayMaterialHelp(MaterialType.PantheonCard, card, index), { local: true })}
          />
        </li>
      )}
    </ol>
  </>
}

const grid = css`
    display: grid;
    grid-template-columns: auto auto auto;
    list-style-type: none;
    gap: 1em;
    padding: 0 0.5em 0.5em 0;
    margin: 0;
    font-size: 1.5em;
`
