import { AppState } from "../AppState.js"
import { dndSpellsService } from "../services/DNDSpellsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class DNDSpellsController {
  constructor() {
    AppState.on('dndSpells', this.drawSpells)
    AppState.on('activeSpell', this.drawSpellDetails)

    this.getSpells()
  }


  async getSpells() {
    try {
      await dndSpellsService.getSpells()
    } catch (error) {
      Pop.error(error)
      console.error('FAILED TO GET DND SPELLS', error);
    }
  }

  async getSpellDetails(spellIndex) {
    try {
      console.log('Spell index', spellIndex);
      await dndSpellsService.getSpellDetails(spellIndex)
    } catch (error) {
      Pop.error(error)
      console.error('FAILED TO GET DND SPELL', error);
    }
  }

  drawSpells() {
    const spells = AppState.dndSpells
    let innerHTMLString = ''
    // NOTE these are just POJOs in the appState, so we create a little template for them here in the forEach
    spells.forEach((spell) => {
      innerHTMLString += `
      <button onclick="app.DNDSpellsController.getSpellDetails('${spell.index}')" class="d-block btn btn-outline-info mb-1 w-100">${spell.name}</button>
      `
    })

    setHTML('dndSpellsList', innerHTMLString)
  }

  drawSpellDetails() {
    const spell = AppState.activeSpell
    // NOTE we just have one spell stored here in the appstate, forEach will not work!
    setHTML('spellDetails', spell.detailsHTMLTemplate)
  }
}