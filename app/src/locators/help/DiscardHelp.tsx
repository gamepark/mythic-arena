/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faHand } from '@fortawesome/free-regular-svg-icons/faHand'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { LocationHelpProps, MaterialComponent, PlayMoveButton, pointerCursorCss, useLegalMoves, usePlay, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const DiscardHelp = ({ location, closeDialog }: LocationHelpProps) => {
  const { t } = useTranslation()
  const name = usePlayerName(location.player)
  const rules = useRules<MythicArenaRules>()!
  const cards = useRules<MythicArenaRules>()?.material(MaterialType.PantheonCard).location(LocationType.PantheonDiscard).player(location.player)
    .sort(item => -item.location.x!)
  const legalMoves = useLegalMoves()
  const play = usePlay()
  return <>
    <h2>{t('help.discard', { player: name })}</h2>
    <p>
      {t('help.discard.count', { number: cards?.length, player: name })}
    </p>
    <ol css={grid}>
      {cards?.entries.map(([index, card]) => {
          const placeInBattlefield = legalMoves.find((move) => rules.game.rule?.id === RuleId.HelaHades && isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield && move.itemIndex === index)
          const placeOnDeck = legalMoves.find((move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDeck && move.itemIndex === index)
          return <li key={index}>
            <MaterialComponent
              type={MaterialType.PantheonCard}
              itemId={card.id}
              css={pointerCursorCss}
              onClick={() => play(displayMaterialHelp(MaterialType.PantheonCard, card, index), { local: true })}
            />
            {!!placeOnDeck && (
              <PlayMoveButton move={placeOnDeck} onPlay={closeDialog} css={buttonUnderCardCss}>
                <span css={splitButtonCss}>{t('move.place-on-deck')}</span>
                <FontAwesomeIcon icon={faHand} />
              </PlayMoveButton>
            )}
            {!!placeInBattlefield && (
              <PlayMoveButton move={placeInBattlefield} onPlay={closeDialog} css={buttonUnderCardCss}>
                <span css={splitButtonCss}>{t('move.place-in-battlefield')}</span>
                <FontAwesomeIcon icon={faHand} />
              </PlayMoveButton>
            )}
          </li>
        }
      )}
    </ol>
  </>
}

const splitButtonCss = css`
    display: block;
    width: 8.41em
`

const buttonUnderCardCss = css`
    font-size: 0.6em;
    display: flex;
    align-items: center;
    margin-top: -0.9em;
    border-radius: 0 0 1em 1em;
    padding-top: 1em`

const grid = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    list-style-type: none;
    gap: 1em;
    padding: 0 0.5em 0.5em 0;
    margin: 0;
    font-size: 1.5em;
`
