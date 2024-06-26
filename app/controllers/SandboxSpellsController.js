import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

export class SandboxSpellsController {
  constructor() {
    // REVIEW cannot get spells on page load because we are not logged in yet!
    // this.getMySpells()

    // NOTE wait until the user is logged in before getting their spells!
    AppState.on('account', this.getMySpells)
    AppState.on('sandboxSpells', this.drawMySpells)
    AppState.on('sandboxSpells', this.drawPreparedSpellCount)
  }

  async saveSpell() {
    try {
      await sandboxSpellsService.saveSpell()
    } catch (error) {
      Pop.error(error)
      console.error('COULD NOT SAVE SPELL', error);
    }
  }

  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      Pop.error(error)
      console.error('COULD NOT GET MY SPELLS', error);
    }
  }

  async toggleSpellPreparation(spellId) {
    try {
      await sandboxSpellsService.toggleSpellPreparation(spellId)
    } catch (error) {
      Pop.error(error)
      console.error('COULD NOT UPDATE SPELL', error);
    }
  }

  drawMySpells() {
    const spells = AppState.sandboxSpells
    let innerHTMLString = ''
    spells.forEach((spell) => innerHTMLString += spell.mySpellListHTMLTemplate)
    setHTML('mySpellsList', innerHTMLString)
  }

  drawPreparedSpellCount() {
    const spells = AppState.sandboxSpells
    // const preparedSpells = spells.filter((spell) => spell.prepared == true)
    const preparedSpells = spells.filter((spell) => spell.prepared)
    setText('preparedSpellCount', `${preparedSpells.length} / ${spells.length}`)
  }
}