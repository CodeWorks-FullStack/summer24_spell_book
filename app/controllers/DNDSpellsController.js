import { AppState } from "../AppState.js"
import { dndSpellsService } from "../services/DNDSpellsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class DNDSpellsController {
  constructor() {
    AppState.on('dndSpells', this.drawSpells)


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
    spells.forEach((spell) => {
      innerHTMLString += `
      <button onclick="app.DNDSpellsController.getSpellDetails('${spell.index}')" class="d-block btn btn-outline-info mb-1 w-100">${spell.name}</button>
      `
    })
    setHTML('dndSpellsList', innerHTMLString)
  }
}