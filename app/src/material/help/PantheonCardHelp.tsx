/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonCardsCharacteristics } from '@gamepark/mythic-arena/material/PantheonCardCharacteristics'
import { getCardRule } from '@gamepark/mythic-arena/rules/character/card.utils'
import { MaterialHelpProps, Picture, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import AfterBattleEffectIcon from '../../images/icons/after-battle-icon.png'
import EndEffectIcon from '../../images/icons/end-icon.png'
import PlayEffectIcon from '../../images/icons/place-icon.png'

export const PantheonCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex } = props
  const { t } = useTranslation()
  const game = useGame<MaterialGame>()!
  if (!item.id?.front) return null
  const stats = PantheonCardsCharacteristics[item.id.front as PantheonCard]
  const power = stats?.power
  return (
    <>
      <h2>{t(`card.${item.id.front}`)}</h2>
      <p>
        <Trans
          defaults="card.power"
          values={{
            power: power
          }}

        />
      </p>
      <p>
        {getCardEffect(t, game, itemIndex!)}
      </p>
    </>
  )
}

const getCardEffect = (t: TFunction, game: MaterialGame, index: number) => {
  const rule = getCardRule(game, index)
  switch (rule?.item.id.front) {
    case PantheonCard.Sol:
    case PantheonCard.Helios:
      return (
        <PlayEffect>
          <Trans defaults="card.solhelios"/>
        </PlayEffect>
      )
    case PantheonCard.Siegfried:
    case PantheonCard.Heracles:
      return (
        <PlayEffect>
          <Trans defaults="card.siegfriedheracles"/>
        </PlayEffect>
      )
    case PantheonCard.Ull:
    case PantheonCard.Artemis:
      return (
        <PlayEffect>
          <Trans defaults="card.ullartemis"/>
        </PlayEffect>
      )
    case PantheonCard.Frigg:
    case PantheonCard.Hera:
      return (
        <PlayEffect>
          <Trans defaults="card.frigghera"/>
        </PlayEffect>
      )
    case PantheonCard.Thor:
    case PantheonCard.Ares:
      return (
        <PlayEffect>
          <Trans defaults="card.thorares"/>
        </PlayEffect>
      )
    case PantheonCard.Freyja:
    case PantheonCard.Aphrodite:
      return (
        <PlayEffect>
          <Trans defaults="card.freyjaaphrodite"/>
        </PlayEffect>
      )
    case PantheonCard.Hela:
    case PantheonCard.Hades:
      return (
        <PlayEffect>
          <Trans defaults="card.helahades"/>
        </PlayEffect>
      )
    case PantheonCard.Tyr:
    case PantheonCard.Athena:
      return (
        <AfterBattleEffect>
          <Trans defaults="card.tyrathena"/>
        </AfterBattleEffect>
      )
    case PantheonCard.Freyr:
    case PantheonCard.Demeter:
      return (
        <AfterBattleEffect>
          <Trans defaults="card.freyrdemeter"/>
        </AfterBattleEffect>
      )
    case PantheonCard.Loki:
    case PantheonCard.Hephaistos:
      return (
        <AfterBattleEffect>
          <Trans defaults="card.lokiephaistos"/>
        </AfterBattleEffect>
      )
    case PantheonCard.Eir:
    case PantheonCard.Asclepios:
      return (
        <AfterBattleEffect>
          <Trans defaults="card.eirasclepios"/>
        </AfterBattleEffect>
      )
    case PantheonCard.Vali:
    case PantheonCard.Erinyes:
      return (
        <AfterBattleEffect>
          <Trans defaults="card.valierinyes"/>
        </AfterBattleEffect>
      )
    case PantheonCard.Balder:
    case PantheonCard.Apollon:
      return (
        <EndEffect>
          <Trans defaults="card.balderappolon"/>
        </EndEffect>
      )
    case PantheonCard.Njord:
    case PantheonCard.Poseidon:
      return <Trans defaults="card.njordposeidon" values={{ weakness: t(`card.${rule?.weaknessId}`) }}/>
    default:
      return ''
  }
}

const PlayEffect: FC = (props) => {
  return (
    <>
      <p css={underlineCss}>
        <Trans defaults="card.play.effect" components={IconsMini}/>
      </p>
      <p>
        {props.children}
      </p>
    </>
  )
}

const AfterBattleEffect: FC = (props) => {
  return (
    <>
      <p css={underlineCss}>
        <Trans defaults="card.after-battle.effect" components={IconsMini}/>
      </p>
      <p>
        {props.children}
      </p>
    </>
  )
}

const EndEffect: FC = (props) => {
  return (
    <>
      <p css={underlineCss}>
        <Trans defaults="card.end.effect" components={IconsMini}/>
      </p>
      <p>
        {props.children}
      </p>
    </>
  )
}


export const alignIcon = css`
    height: 1.5em;
    position: relative;
    border-radius: 0.1em;
    top: 0.4em;
    margin-top: -0.3em;
`

export const IconsMini = {
  'play': <Picture css={alignIcon} src={PlayEffectIcon}/>,
  'afterbattle': <Picture css={alignIcon} src={AfterBattleEffectIcon}/>,
  'end': <Picture css={alignIcon} src={EndEffectIcon}/>
}

const underlineCss = css`
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.3em 0.3em 0.5em 0;
    margin-bottom: 0;
    border-bottom: 0.1em solid gray;
`
