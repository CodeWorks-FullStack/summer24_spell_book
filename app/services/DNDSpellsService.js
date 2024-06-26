import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndApi } from "./AxiosService.js"

class DNDSpellsService {
  async getSpellDetails(spellIndex) {
    const response = await dndApi.get(`spells/${spellIndex}`)

    console.log('🐕🪄 GOT SPELL DETAILS', response.data);

    // NOTE we get a single object back from the API, no need to map!!!!
    const newSpell = new Spell(response.data)

    AppState.activeSpell = newSpell
  }
  async getSpells() {
    const response = await dndApi.get('spells')
    console.log('🐕🧾🪄🔮 GOT ALL SPELLS', response.data);

    // NOTE not mapping over these today because the data is so minimal
    AppState.dndSpells = response.data.results
  }
}

export const dndSpellsService = new DNDSpellsService()