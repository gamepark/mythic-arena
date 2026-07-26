import { MythicArenaOptionsSpec } from '@gamepark/mythic-arena/MythicArenaOptions'
import { MythicArenaRules } from '@gamepark/mythic-arena/MythicArenaRules'
import { MythicArenaSetup } from '@gamepark/mythic-arena/MythicArenaSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="mythic-arena"
      Rules={MythicArenaRules}
      optionsSpec={MythicArenaOptionsSpec}
      GameSetup={MythicArenaSetup}
      material={Material}
      locators={Locators}
      tutorial={new Tutorial()}
      theme={{
        dialog: {
          backgroundColor: '#e7dcb4'
        }
      }}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
