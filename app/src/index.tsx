/** @jsxImportSource @emotion/react */
import { GameTemplateOptionsSpec } from '@gamepark/mythic-arena/GameTemplateOptions'
import { GameTemplateRules } from '@gamepark/mythic-arena/GameTemplateRules'
import { GameTemplateSetup } from '@gamepark/mythic-arena/GameTemplateSetup'
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
      Rules={GameTemplateRules}
      optionsSpec={GameTemplateOptionsSpec}
      GameSetup={GameTemplateSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
