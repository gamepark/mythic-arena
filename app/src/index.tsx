/** @jsxImportSource @emotion/react */
import { MythicArenaOptionsSpec } from '@gamepark/mythic-arena/MythicArenaOptions'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { MythicArenaSetup } from '@gamepark/mythic-arena/MythicArenaSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="mythic-arena"
      Rules={MythicArenaRules}
      optionsSpec={MythicArenaOptionsSpec}
      GameSetup={MythicArenaSetup}
      material={Material}
      locators={Locators}
      theme={{
        dialog: {
          backgroundColor: '#e7dcb4'
        }
      }}
      animations={gameAnimations}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
