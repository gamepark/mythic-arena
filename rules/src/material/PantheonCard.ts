import { getEnumValues } from '@gamepark/rules-api'

export enum PantheonCard {

  // GREEK
  Dionysos = 1,
  Asclepios,
  Zeus,
  Hera,
  Erinyes,
  Demeter,
  Poseidon,
  Heracles,
  Helios,
  Apollon,
  Hephaistos,
  Aphrodite,
  Hades,
  Ares,
  Athena,
  Gaia,
  Artemis,

  // NORSE
  Tyr = 100,
  Njord,
  Beyla,
  Ull,
  Vali,
  Frigg,
  Loki,
  Freyja,
  Siegfried,
  Nerthus,
  Hela,
  Freyr,
  Balder,
  Eir,
  Odin,
  Thor,
  Sol,
}

export const greekCards = getEnumValues(PantheonCard).filter((c) => c >= PantheonCard.Tyr)
export const norseCards = getEnumValues(PantheonCard).filter((c) => c < PantheonCard.Tyr)
