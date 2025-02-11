import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import Dionysos from '../images/pantheon/greek/Dionysos.jpg'
import Asclepios from '../images/pantheon/greek/Asclepios.jpg'
import Zeus from '../images/pantheon/greek/Zeus.jpg'
import Hera from '../images/pantheon/greek/Hera.jpg'
import Erinyes from '../images/pantheon/greek/Erinyes.jpg'
import Demeter from '../images/pantheon/greek/Demeter.jpg'
import Poseidon from '../images/pantheon/greek/Poseidon.jpg'
import Heracles from '../images/pantheon/greek/Heracles.jpg'
import Helios from '../images/pantheon/greek/Helios.jpg'
import Apollon from '../images/pantheon/greek/Apollon.jpg'
import Hephaistos from '../images/pantheon/greek/Hephaistos.jpg'
import Aphrodite from '../images/pantheon/greek/Aphrodite.jpg'
import Hades from '../images/pantheon/greek/Hades.jpg'
import Ares from '../images/pantheon/greek/Ares.jpg'
import Athena from '../images/pantheon/greek/Athena.jpg'
import Gaia from '../images/pantheon/greek/Gaia.jpg'
import Artemis from '../images/pantheon/greek/Artemis.jpg'
import Tyr from '../images/pantheon/norse/Tyr.jpg'
import Njord from '../images/pantheon/norse/Njord.jpg'
import Beyla from '../images/pantheon/norse/Beyla.jpg'
import Ull from '../images/pantheon/norse/Ull.jpg'
import Vali from '../images/pantheon/norse/Vali.jpg'
import Frigg from '../images/pantheon/norse/Frigg.jpg'
import Loki from '../images/pantheon/norse/Loki.jpg'
import Freyja from '../images/pantheon/norse/Freyja.jpg'
import Siegfried from '../images/pantheon/norse/Siegfried.jpg'
import Nerthus from '../images/pantheon/norse/Nerthus.jpg'
import Hela from '../images/pantheon/norse/Hela.jpg'
import Freyr from '../images/pantheon/norse/Freyr.jpg'
import Balder from '../images/pantheon/norse/Balder.jpg'
import Eir from '../images/pantheon/norse/Eir.jpg'
import Odin from '../images/pantheon/norse/Odin.jpg'
import Thor from '../images/pantheon/norse/Thor.jpg'
import Sol from '../images/pantheon/norse/Sol.jpg'
import Greek from '../images/pantheon/greek/Greek.jpg'
import Norse from '../images/pantheon/norse/Norse.jpg'
import { PantheonCardHelp } from './help/PantheonCardHelp'

export class PantheonCardDescription extends CardDescription {
  backImages = {
    [PantheonType.Greek]: Greek,
    [PantheonType.Norse]: Norse,
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
    [PantheonCard.Sol]: Sol,
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    if (isMoveItemType(MaterialType.AllegianceToken)(move) && move.location.type === LocationType.PantheonCard && move.location.parent === context.index) return true
    return super.canShortClick(move, context)
  }

  help = PantheonCardHelp
}

export const pantheonCardDescription = new PantheonCardDescription()
