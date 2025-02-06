import { MaterialGame } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { PantheonCard } from '../../material/PantheonCard'
import { Aphrodite } from './Aphrodite'
import { Ares } from './Ares'
import { Artemis } from './Artemis'
import { Freyja } from './Freyja'
import { Frigg } from './Frigg'
import { Hades } from './Hades'
import { Hela } from './Hela'
import { Helios } from './Helios'
import { Hera } from './Hera'
import { Heracles } from './Heracles'
import { PantheonCardRule } from './PantheonCardRule'
import { Siegfried } from './Siegfried'
import { Sol } from './Sol'
import { Thor } from './Thor'
import { Ull } from './Ull'

export const getCardRule = (game: MaterialGame, cardIndex: number): PantheonCardRule | undefined => {
  const item = game.items[MaterialType.PantheonCard]![cardIndex]
  if (item.id?.front === undefined) return undefined
  const CardRule = CardRules[item.id.front as PantheonCard]
  if (!CardRule) return new PantheonCardRule(game, cardIndex)
  return new CardRule(game, cardIndex)
}



export const CardRules: Partial<Record<PantheonCard, typeof PantheonCardRule>> = {
  [PantheonCard.Artemis]: Artemis,
  [PantheonCard.Frigg]: Frigg,
  [PantheonCard.Helios]: Helios,
  [PantheonCard.Heracles]: Heracles,
  [PantheonCard.Siegfried]: Siegfried,
  [PantheonCard.Sol]: Sol,
  [PantheonCard.Ull]: Ull,
  [PantheonCard.Hera]: Hera,
  [PantheonCard.Thor]: Thor,
  [PantheonCard.Ares]: Ares,
  [PantheonCard.Freyja]: Freyja,
  [PantheonCard.Aphrodite]: Aphrodite,
  [PantheonCard.Hela]: Hela,
  [PantheonCard.Hades]: Hades,
  //[PantheonCard.Tyr]: Tyr,
  //[PantheonCard.Athena]: Athena,
  //[PantheonCard.Freyr]: Freyr,
  //[PantheonCard.Demeter]: Demeter,
  //[PantheonCard.Loki]: Loki,
  //[PantheonCard.Hephaistos]: Hephaistos,
  //[PantheonCard.Eir]: Eir,
  //[PantheonCard.Asclepios]: Asclepios,
  //[PantheonCard.Vali]: Vali,
  //[PantheonCard.Erinyes]: Erinyes,
  //[PantheonCard.Balder]: Balder,
  //[PantheonCard.Apollon]: Apollon,
  //[PantheonCard.Njord]: Njord,
  //[PantheonCard.Poseidon]: Poseidon,
  //[PantheonCard.Nerthus]: Nerthus,
  //[PantheonCard.Gaia]: Gaia,
  //[PantheonCard.Odin]: Odin,
  //[PantheonCard.Zeus]: Zeus,
  //[PantheonCard.Beyla]: Beyla,
  //[PantheonCard.Dionysos]: Dionysos
}
