import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { pantheons, PantheonType } from './material/PantheonType'


type PlayerOptions = { id: PantheonType }
/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type MythicArenaOptions = {
  players: PlayerOptions[]
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const MythicArenaOptionsSpec: OptionsSpec<MythicArenaOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('player.pantheon'),
      values: pantheons,
      valueSpec: pantheon => ({ label: t => t(`player.${pantheon}`)})
    }
  }
}
