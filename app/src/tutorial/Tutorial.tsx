/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/mythic-arena/material/LocationType'
import { MaterialType } from '@gamepark/mythic-arena/material/MaterialType'
import { PantheonCard } from '@gamepark/mythic-arena/material/PantheonCard'
import { PantheonType } from '@gamepark/mythic-arena/material/PantheonType'
import { RuleId } from '@gamepark/mythic-arena/rules/RuleId'
import { MaterialTutorial, PlayMoveButton, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { gloryDescription } from '../material/GloryDescription'
import { IconsMini } from '../material/help/PantheonCardHelp'
import { me, opponent, TutorialSetup } from './TutorialSetup'
import startRule = MaterialMoveBuilder.startRule


const BaseComponents = {
  bold: <strong/>,
  italic: <em/>,
  ...IconsMini
}

export class Tutorial extends MaterialTutorial<PantheonType, MaterialType, LocationType> {
  version = 1

  options = {
    players: [
      { id: me },
      { id: opponent }
    ]
  }

  players = [
    { id: me },
    { id: opponent, name: 'Norsy' }
  ]
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pantheon" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.glory" components={BaseComponents}/>,
        position: { y: 15 }
      },
      focus: () => ({
        staticItems: [
          { type: MaterialType.GloryPoint, item: gloryDescription.staticItem }
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.deck" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).player(me)
        ],
        margin: {
          top: 5,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draw" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(me)
        ],
        margin: {
          right: 20
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.asclepios" components={BaseComponents}/>,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(me)
        ],
        locations: [
          this.location(LocationType.Battlefield).x(0).y(0).location
        ],
        margin: {
          right: 5,
          left: 10
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.asclepios.effect" components={BaseComponents}/>,
        position: { y: 23 },
        size: { width: 80 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.Battlefield)
        ],
        margin: {
          bottom: 10,
          top: 1
        }
      })
    },
    {
      move: {
        filter: (move) => isMoveItemType(MaterialType.Power)(move)
      }
    },
    {
      move: {
        filter: (move) => isMoveItemType(MaterialType.ShatteredShield)(move),
        interrupt: (move) => isStartPlayerTurn(move) && move.id === RuleId.DrawCard
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent" components={BaseComponents}/>
      },
      move: {
        interrupt: (move) => isStartRule(move) && move.id === RuleId.PlaceCard
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.adjacent" components={BaseComponents}/>,
        position: { x: -10, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(opponent),
          this.material(game, MaterialType.PantheonCard).location(LocationType.Battlefield)
        ],
        margin: {
          top: 5,
          bottom: 7
        }
      }),
      move: {}
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield && move.location.x === 0 && move.location.y === -1,
        interrupt: (move) => isStartRule(move) && move.id === RuleId.BattleResolution
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.siegfried" components={BaseComponents}/>,
        position: { y: 22 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.Battlefield).id(({ front }: any) => front === PantheonCard.Siegfried)
        ],
        margin: {
          bottom: 7
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.siegfried.effect" components={BaseComponents}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.Battlefield),
          this.material(game, MaterialType.AllegianceToken).location(LocationType.AllegianceStock).player(opponent)
        ],
        margin: {
          top: 3,
          bottom: 3,
          left: 4,
          right: 4
        }
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hera" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(me)
        ],
        margin: {
          right: 20
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hera.discard" components={BaseComponents}/>,
        position: { x: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(me)
        ],
        margin: {
          right: 25
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDiscard
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.discard" components={BaseComponents}/>,
        position: { x: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(me)
        ],
        margin: {
          right: 25
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.shields" components={BaseComponents}/>,
        position: { y: 22 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.Battlefield).id(({ front }: any) => front === PantheonCard.Siegfried)
        ],
        margin: {
          bottom: 12,
          top: 3
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.shields.block" components={BaseComponents}/>,
        position: { y: 22 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.Battlefield).id(({ front }: any) => front === PantheonCard.Siegfried)
        ],
        margin: {
          bottom: 12,
          top: 3
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.shattered" components={BaseComponents}/>,
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ShatteredShield).location(LocationType.PlayerShatteredShield).player(me)
        ],
        margin: {
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.place.dionysos" components={BaseComponents}/>,
        position: { y: 22 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Siegfried),
          this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Dionysos)
        ],
        locations: [
          this.location(LocationType.Battlefield).x(-1).y(-1).location
        ],
        margin: {
          bottom: 12,
          top: 3
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield && move.location.x === -1 && move.location.y === -1,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.dionysos" components={BaseComponents}/>,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Siegfried),
          this.material(game, MaterialType.ShatteredShield).location(LocationType.PlayerShatteredShield).player(me)
        ],
        margin: {
          left: 3,
          right: 3
        }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.ShatteredShield)(move)
          && move.location.parent === this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Siegfried).getIndex()
      }
    },
    {
      move: {
        filter: (move) => isStartRule(move) && move.id === RuleId.BattleResolution
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.discard" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.PantheonDiscard
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield && move.location.x === -1 && move.location.y === 0,
        interrupt: (move) => isStartPlayerTurn(move) && move.id === RuleId.DrawCard
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.nerthus" components={BaseComponents}/>,
        position: { y: 23 }
      },
      focus: (game) => {
        const dionysos = this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Dionysos)
        return ({
          materials: [
            this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Nerthus),
            dionysos,
            this.material(game, MaterialType.AllegianceToken).location(LocationType.PantheonCardAllegiance).parent(dionysos.getIndex())
          ],
          margin: {
            bottom: 15,
            top: 1
          }
        })
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fragility" components={BaseComponents}/>,
        position: { y: 21 }
      },
      focus: (game) =>
        ({
          materials: [
            this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Nerthus)
          ],
          margin: {
            bottom: 10,
            top: 1
          }
        }),
      move : {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.aphrodite" components={BaseComponents}/>,
        position: { x: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).location(LocationType.PlayerHand).player(me)
        ],
        margin: {
          right: 20
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.aphrodite.fragility" components={BaseComponents}/>,
        position: { x: 20, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Aphrodite),
          this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Nerthus)
        ],
        locations: [
          this.location(LocationType.Battlefield).x(-2).y(0).location
        ],
        margin: {
          bottom: 10,
          top: 3
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.PantheonCard)(move) && move.location.type === LocationType.Battlefield && move.location.x === -2 && move.location.y === 0,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.aphrodite.power" components={BaseComponents}/>,
        position: { y: 20 }
      },
      focus: (game) => {
        const asclepios = this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Asclepios)
        return ({
          materials: [
            this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Aphrodite),
            asclepios,
            this.material(game, MaterialType.AllegianceToken).location((l) => l.type === LocationType.PantheonCardAllegiance && l.parent === asclepios.getIndex())
          ],
          margin: {
            bottom: 10,
            top: 1
          }
        })
      },
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.AllegianceToken)(move)
            && move.location.player === opponent
            && game.items[MaterialType.AllegianceToken]![move.itemIndex].location.parent === this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Asclepios).getIndex()
        }
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.battle" components={{
            ...BaseComponents,
            battle: <PlayMoveButton move={startRule(RuleId.BattleResolution)} />
          }} />
        )
      },
      move: {
        filter: (move, ) => isStartRule(move) && move.id === RuleId.BattleResolution
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.alignement" components={BaseComponents}/>,
        size: { width: 100 },
        position: { y: 20 }
      },
      focus: (game) => {
        const nerthus = this.material(game, MaterialType.PantheonCard).id(({ front }: any) => front === PantheonCard.Nerthus)

        return ({
          materials: [
            this.material(game, MaterialType.PantheonCard).location((l) => l.type === LocationType.Battlefield && l.y === 0),
            this.material(game, MaterialType.AllegianceToken).location((l) => l.type === LocationType.PantheonCardAllegiance && l.parent === nerthus.getIndex())
          ],
          margin: {
            bottom: 15,
            top: 1
          }
        })
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.battlefield" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.end" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <span  css={css`line-height: 1.5em`}><Trans defaults="tuto.summary" components={BaseComponents}/> </span>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.go" components={BaseComponents}/>
      }
    }
  ]
}
