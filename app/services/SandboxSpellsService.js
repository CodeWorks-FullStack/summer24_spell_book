import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async toggleSpellPreparation(spellId) {
    const spellIndex = AppState.sandboxSpells.findIndex((spell) => spell.id == spellId)

    if (spellIndex == -1) throw new Error("You messed up on findIndex dawg")

    const foundSpell = AppState.sandboxSpells[spellIndex]

    console.log('found the spell!', foundSpell);

    // create an object with the opposite boolean of the spell's prepared status from the AppState
    const spellData = { prepared: !foundSpell.prepared }

    // PUT is an update request
    const response = await api.put(`api/spells/${spellId}`, spellData)

    console.log('🐕🔧🔮 UPDATED SPELL', response.data);

    const updatedSpell = new Spell(response.data)

    // NOTE take out the old one, and replace it with the new one
    AppState.sandboxSpells.splice(spellIndex, 1, updatedSpell)
  }
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
    const newSpell = new Spell(response.data)
    AppState.sandboxSpells.push(newSpell)
  }
}

export const sandboxSpellsService = new SandboxSpellsService()