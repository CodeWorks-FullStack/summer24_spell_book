import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async getMySpells() {
    const response = await api.get('api/spells')

    console.log('🐕🔮🔮🔮🔮🔮 GETTING MY SPELLS', response.data);

    const newSpells = response.data.map((spellPOJO) => new Spell(spellPOJO))

    AppState.sandboxSpells = newSpells
  }
  async saveSpell() {
    const spellToSave = AppState.activeSpell
    const response = await api.post('api/spells', spellToSave)

    console.log('🐕✨🔮 CREATED SPELL', response.data);
    // TODO maybe do some more stuff here later....
  }
}

export const sandboxSpellsService = new SandboxSpellsService()