import { Direction } from '@gamepark/rules-api'
import { PantheonCard } from './PantheonCard'
import { PantheonType } from './PantheonType'

export type PantheonCardCharacteristics = {
  power: number
  effect?: any
  allegiance?: PantheonType
  shieldFor: Direction[]
  fragilityFor: Direction[]
}


const Dionysos: PantheonCardCharacteristics = {
  power: 5,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.North, Direction.West],
  fragilityFor: [],
}

const Asclepios: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.West],
  fragilityFor: []
}

const Zeus: PantheonCardCharacteristics = {
  power: 6,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: [Direction.West]
}

const Hera: PantheonCardCharacteristics = {
  power: 0,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Erinyes: PantheonCardCharacteristics = {
  power: 99,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Demeter: PantheonCardCharacteristics = {
  power: 4,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.West],
  fragilityFor: [Direction.North]

}

const Poseidon: PantheonCardCharacteristics = {
  power: 7,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Heracles: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.North, Direction.West, Direction.East],
  fragilityFor: []

}

const Helios: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.North, Direction.East],
  fragilityFor: []
}

const Apollon: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.East],
  fragilityFor: []

}

const Hephaistos: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Greek,
  shieldFor: [Direction.North],
  fragilityFor: []

}

const Aphrodite: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Hades: PantheonCardCharacteristics = {
  power: 0,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Ares: PantheonCardCharacteristics = {
  power: 4,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Athena: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Gaia: PantheonCardCharacteristics = {
  power: 8,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: [Direction.North, Direction.West, Direction.East],

}

const Artemis: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Greek,
  shieldFor: [],
  fragilityFor: []

}

const Tyr: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Njord: PantheonCardCharacteristics = {
  power: 7,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Beyla: PantheonCardCharacteristics = {
  power: 5,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.North, Direction.West],
  fragilityFor: []

}

const Ull: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Vali: PantheonCardCharacteristics = {
  power: 99,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Frigg: PantheonCardCharacteristics = {
  power: 0,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Loki: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.North],
  fragilityFor: []

}

const Freyja: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Siegfried: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.North, Direction.West, Direction.East],
  fragilityFor: []

}

const Nerthus: PantheonCardCharacteristics = {
  power: 8,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: [Direction.North, Direction.West, Direction.East],

}

const Hela: PantheonCardCharacteristics = {
  power: 0,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Freyr: PantheonCardCharacteristics = {
  power: 4,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.West],
  fragilityFor: [Direction.North]

}

const Balder: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.East],
  fragilityFor: []

}

const Eir: PantheonCardCharacteristics = {
  power: 2,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.West],
  fragilityFor: []

}

const Odin: PantheonCardCharacteristics = {
  power: 6,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: [Direction.West],

}

const Thor: PantheonCardCharacteristics = {
  power: 4,
  allegiance: PantheonType.Norse,
  shieldFor: [],
  fragilityFor: []

}

const Sol: PantheonCardCharacteristics = {
  power: 3,
  allegiance: PantheonType.Norse,
  shieldFor: [Direction.East, Direction.West],
  fragilityFor: []
}




export const PantheonCardsCharacteristics: Record<PantheonCard, PantheonCardCharacteristics> = {
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
