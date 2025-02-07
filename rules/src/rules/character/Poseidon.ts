import { PantheonCard } from '../../material/PantheonCard'
import { Njord } from './Njord'

export class Poseidon extends Njord {
  get weaknessId() {
    return PantheonCard.Zeus
  }
}
