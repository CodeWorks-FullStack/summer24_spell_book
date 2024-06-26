import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";

export class SandboxSpellsController {
  constructor() { }

  async saveSpell() {
    try {
      await sandboxSpellsService.saveSpell()
    } catch (error) {
      Pop.error(error)
      console.error('COULD NOT SAVE SPELL', error);
    }
  }
}