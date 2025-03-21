/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonCardsCharacteristics } from '@gamepark/mythic-arena/material/PantheonCardCharacteristics'
import { pantheons } from '@gamepark/mythic-arena/material/PantheonType'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { getCardRule } from '@gamepark/mythic-arena/rules/character/card.utils'
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { MaterialHelpProps, Picture, PlayMoveButton, useLegalMove, usePlayerName, useRules, useUndo } from '@gamepark/react-game'
import { isMoveItemType, LocalMoveType, MaterialGame, MaterialMove, MoveKind } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import AfterBattleEffectIcon from '../../images/icons/after-battle-icon.png'
import EndEffectIcon from '../../images/icons/end-icon.png'
import PlayEffectIcon from '../../images/icons/place-icon.png'
import { powerTokenDescription } from '../PowerTokenDescription'
import { shatteredShieldTokenDescription } from '../ShatteredShieldTokenDescription'

export const PantheonCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const rules = useRules<MythicArenaRules>()!
  const { game } = rules
  const discard = useLegalMove((move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDiscard && move.itemIndex === itemIndex)
  const placeInBattlefield = useLegalMove((move) => rules.game.rule?.id === RuleId.HelaHades && isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield && move.itemIndex === itemIndex)
  const placeOnDeck = useLegalMove((move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDeck && move.itemIndex === itemIndex)
  const addPower = useLegalMove((move) => isMoveItemType(MaterialType.Power)(move) && move.location.type === LocationType.PantheonCardPower && move.location.parent === itemIndex)
  const shatteredShield = useLegalMove((move) => isMoveItemType(MaterialType.ShatteredShield)(move) && move.location.type === LocationType.PantheonCardShatteredShield && move.location.parent === itemIndex)
  const capture = useLegalMove((move) => isMoveItemType(MaterialType.AllegianceToken)(move) && (
    (move.location.type === LocationType.AllegianceStock && rules.material(MaterialType.AllegianceToken).getItem(move.itemIndex)!.location.parent === itemIndex) ||
    (move.location.type === LocationType.PantheonCardAllegiance && move.location.parent === itemIndex)
  ))

  const name = usePlayerName(item?.location?.player)

  const [undo, canUndo] = useUndo()
  const undoModalPredicate = (move: MaterialMove) => move.kind === MoveKind.LocalMove && move.type === LocalMoveType.DisplayHelp
  const canUndoDialog = canUndo(undoModalPredicate)
  if (item.location?.type === LocationType.PantheonDeck) {
    return (
      <>
        <h2>{t('help.deck')}</h2>
        <p>
          <Trans defaults="help.deck.count" values={{
            player: name,
            number: rules.material(MaterialType.PantheonCard).location(LocationType.PantheonDeck).player(item.location.player)
          }}/>
        </p>
      </>
    )
  }
  if (!item.id?.front) return null
  const stats = PantheonCardsCharacteristics[item.id.front as PantheonCard]
  const power = stats?.power
  return (
    <>
      {canUndoDialog && <FontAwesomeIcon icon={faArrowLeft} css={goBackCss} onClick={() => undo(undoModalPredicate)}/>}
      <h2>{t(`card.${item.id.front}`)}</h2>
      {!!discard && (
        <p>
          <PlayMoveButton move={discard} onPlay={closeDialog}>
            {t('move.discard')}
          </PlayMoveButton>
        </p>
      )}
      {!!placeOnDeck && (
        <p>
          <PlayMoveButton move={placeOnDeck} onPlay={closeDialog}>
            {t('move.place-on-deck')}
          </PlayMoveButton>
        </p>
      )}
      {!!capture && (
        <p>
          <PlayMoveButton move={capture} onPlay={closeDialog}>
            {t('move.capture')}
          </PlayMoveButton>
        </p>
      )}
      {!!addPower && (
        <p>
          <PlayMoveButton move={addPower} onPlay={closeDialog}>
            {t('move.power')}
          </PlayMoveButton>
        </p>
      )}
      {!!shatteredShield && (
        <p>
          <PlayMoveButton move={shatteredShield} onPlay={closeDialog}>
            {t('move.shattered')}
          </PlayMoveButton>
        </p>
      )}
      {!!placeInBattlefield && (
        <p>
          <PlayMoveButton move={placeInBattlefield} onPlay={closeDialog}>
            {t('move.place-in-battlefield')}
          </PlayMoveButton>
        </p>
      )}
      <p>
        <Trans
          defaults="card.power"
          values={{
            power: power
          }}

        />
      </p>
      {getCardEffect(t, game, itemIndex!)}
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
      const otherAllegiance = pantheons.find((p) => rule?.characteristics.allegiance === rule?.allegiance ? p !== rule?.allegiance : p === rule?.allegiance)
      return (
        <EndEffect>
          <Trans defaults="card.balderapollon" values={{
            card: t(`card.${rule?.item.id.front}`),
            cardAllegiance: t(`player.${rule?.characteristics.allegiance}`),
            otherAllegiance: t(`pantheon.${otherAllegiance}`)
          }}/>
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
  'end': <Picture css={alignIcon} src={EndEffectIcon}/>,
  'shattered': <Picture css={alignIcon} src={shatteredShieldTokenDescription.image}/>,
  'power': <Picture css={alignIcon} src={powerTokenDescription.image}/>
}

const underlineCss = css`
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.3em 0.3em 0.5em 0;
    margin-bottom: 0;
    border-bottom: 0.1em solid gray;
`

const goBackCss = css`
    position: absolute;
    right: 2em;
    top: 0.4em;
    cursor: pointer;
    font-size: 1.2em;
    z-index: 100;
`
