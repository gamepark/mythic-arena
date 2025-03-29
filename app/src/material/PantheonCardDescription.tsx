import { faHand } from '@fortawesome/free-regular-svg-icons/faHand'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import AfterBattleEffectIcon from '../images/icons/after-battle-icon.png'
import EndEffectIcon from '../images/icons/end-icon.png'
import PlayEffectIcon from '../images/icons/place-icon.png'
import Aphrodite from '../images/pantheon/greek/Aphrodite.jpg'
import Apollon from '../images/pantheon/greek/Apollon.jpg'
import Ares from '../images/pantheon/greek/Ares.jpg'
import Artemis from '../images/pantheon/greek/Artemis.jpg'
import Asclepios from '../images/pantheon/greek/Asclepios.jpg'
import Athena from '../images/pantheon/greek/Athena.jpg'
import Demeter from '../images/pantheon/greek/Demeter.jpg'
import Dionysos from '../images/pantheon/greek/Dionysos.jpg'
import Erinyes from '../images/pantheon/greek/Erinyes.jpg'
import Gaia from '../images/pantheon/greek/Gaia.jpg'
import Greek from '../images/pantheon/greek/Greek.jpg'
import Hades from '../images/pantheon/greek/Hades.jpg'
import Helios from '../images/pantheon/greek/Helios.jpg'
import Hephaistos from '../images/pantheon/greek/Hephaistos.jpg'
import Hera from '../images/pantheon/greek/Hera.jpg'
import Heracles from '../images/pantheon/greek/Heracles.jpg'
import Poseidon from '../images/pantheon/greek/Poseidon.jpg'
import Zeus from '../images/pantheon/greek/Zeus.jpg'
import Balder from '../images/pantheon/norse/Balder.jpg'
import Beyla from '../images/pantheon/norse/Beyla.jpg'
import Eir from '../images/pantheon/norse/Eir.jpg'
import Freyja from '../images/pantheon/norse/Freyja.jpg'
import Freyr from '../images/pantheon/norse/Freyr.jpg'
import Frigg from '../images/pantheon/norse/Frigg.jpg'
import Hela from '../images/pantheon/norse/Hela.jpg'
import Loki from '../images/pantheon/norse/Loki.jpg'
import Nerthus from '../images/pantheon/norse/Nerthus.jpg'
import Njord from '../images/pantheon/norse/Njord.jpg'
import Norse from '../images/pantheon/norse/Norse.jpg'
import Odin from '../images/pantheon/norse/Odin.jpg'
import Siegfried from '../images/pantheon/norse/Siegfried.jpg'
import Sol from '../images/pantheon/norse/Sol.jpg'
import Thor from '../images/pantheon/norse/Thor.jpg'
import Tyr from '../images/pantheon/norse/Tyr.jpg'
import Ull from '../images/pantheon/norse/Ull.jpg'
import Vali from '../images/pantheon/norse/Vali.jpg'
import { PantheonCardHelp } from './help/PantheonCardHelp'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export class PantheonCardDescription extends CardDescription {
  backImages = {
    [PantheonType.Greek]: Greek,
    [PantheonType.Norse]: Norse
  }

  images = {
    // GREEK
    [PantheonCard.Dionysos]: Dionysos,
    [PantheonCard.Asclepios]: Asclepios,
    [PantheonCard.Zeus]: Zeus,
    [PantheonCard.Hera]: Hera,
    [PantheonCard.Erinyes]: Erinyes,
    [PantheonCard.Demeter]: Demeter,
    [PantheonCard.Poseidon]: Poseidon,
    [PantheonCard.Heracles]: Heracles,
    [PantheonCard.Helios]: Helios,
    [PantheonCard.Apollon]: Apollon,
    [PantheonCard.Hephaistos]: Hephaistos,
    [PantheonCard.Aphrodite]: Aphrodite,
    [PantheonCard.Hades]: Hades,
    [PantheonCard.Ares]: Ares,
    [PantheonCard.Athena]: Athena,
    [PantheonCard.Gaia]: Gaia,
    [PantheonCard.Artemis]: Artemis,

    // NORSE
    [PantheonCard.Tyr]: Tyr,
    [PantheonCard.Njord]: Njord,
    [PantheonCard.Beyla]: Beyla,
    [PantheonCard.Ull]: Ull,
    [PantheonCard.Vali]: Vali,
    [PantheonCard.Frigg]: Frigg,
    [PantheonCard.Loki]: Loki,
    [PantheonCard.Freyja]: Freyja,
    [PantheonCard.Siegfried]: Siegfried,
    [PantheonCard.Nerthus]: Nerthus,
    [PantheonCard.Hela]: Hela,
    [PantheonCard.Freyr]: Freyr,
    [PantheonCard.Balder]: Balder,
    [PantheonCard.Eir]: Eir,
    [PantheonCard.Odin]: Odin,
    [PantheonCard.Thor]: Thor,
    [PantheonCard.Sol]: Sol
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (isMoveItemType(MaterialType.AllegianceToken)(move) && move.location.type === LocationType.PantheonCardAllegiance && move.location.parent === context.index) return true
    if (isMoveItemType(MaterialType.AllegianceToken)(move) && move.location.type === LocationType.AllegianceStock) return context.rules.material(MaterialType.AllegianceToken).getItem(move.itemIndex)!.location.parent === context.index
    if (isMoveItemType(MaterialType.Power)(move) && move.location.type === LocationType.PantheonCardPower && move.location.parent === context.index) return true
    if (isMoveItemType(MaterialType.ShatteredShield)(move) && move.location.type === LocationType.PantheonCardShatteredShield && move.location.parent === context.index) return true
    return super.canShortClick(move, context)
  }

  getImages() {
    const images = super.getImages()
    images.push(PlayEffectIcon)
    images.push(AfterBattleEffectIcon)
    images.push(EndEffectIcon)
    return images
  }

  displayHelp(item: MaterialItem, context: ItemContext) {
    if (item.location.type === LocationType.PantheonDiscard) return displayLocationHelp({ type: LocationType.PantheonDiscard, player: item.location.player })
    return super.displayHelp(item, context)
  }

  menuAlwaysVisible = true

  getItemMenu(_item: MaterialItem, context: ItemContext, legalMoves: MaterialMove[]) {
    const discard = legalMoves.find((move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDiscard && move.itemIndex === context.index)
    if (discard) {
      return (
        <>
          <ItemMenuButton
            move={discard}
            label={<Trans defaults="move.discard"/>}
            labelPosition={"right"}
            angle={90}
          >
            <FontAwesomeIcon icon={faTrashCan}/>
          </ItemMenuButton>
        </>
      )
    }

    const capture = legalMoves.find((move) => isMoveItemType(MaterialType.AllegianceToken)(move)
      && (
        move.location.type === LocationType.PantheonCardAllegiance && move.location.parent === context.index ||
          move.location.type === LocationType.AllegianceStock && context.rules.material(MaterialType.AllegianceToken).getItem(move.itemIndex).location.parent === context.index
      ))
    if (capture) {
      return (
        <>
          <ItemMenuButton
            move={capture}
            radius={2}
            labelPosition="right"
            label={<Trans defaults="move.capture"/>}
            angle={-70}>
            <FontAwesomeIcon icon={faHand}/>
          </ItemMenuButton>
        </>
      )
    }

    return
  }

  help = PantheonCardHelp
}

export const pantheonCardDescription = new PantheonCardDescription()
