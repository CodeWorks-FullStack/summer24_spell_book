import { AppState } from "../AppState.js";
import { dndApi } from "./AxiosService.js"

class DNDSpellsService {
  async getSpellDetails(spellIndex) {
    const response = await dndApi.get(`spells/${spellIndex}`)

    console.log('🐕🪄', response.data);
  }
  async getSpells() {
    const response = await dndApi.get('spells')
    console.log('🐕🧾🪄🔮', response.data);

    // NOTE not mapping over these today because the data is so minimal
    AppState.dndSpells = response.data.results
  }
}

export const dndSpellsService = new DNDSpellsService()