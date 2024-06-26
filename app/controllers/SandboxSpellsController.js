import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";

export class SandboxSpellsController {
  constructor() {
    // REVIEW cannot get spells on page load because we are not logged in yet!
    // this.getMySpells()

    // NOTE wait until the user is logged in before getting their spells!
    AppState.on('account', this.getMySpells)
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
}