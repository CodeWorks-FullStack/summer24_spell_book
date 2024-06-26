import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js";

class SandboxSpellsService {
  async toggleSpellPreparation(spellId) {
    // NOTE findIndex serves two purposes here. We can use the returned index to access our spell in the AppState, and we can also use it to splice out the old data from the AppState 
    const spellIndex = AppState.sandboxSpells.findIndex((spell) => spell.id == spellId)

    if (spellIndex == -1) throw new Error("You messed up on findIndex dawg")

    // NOTE use bracket notation to access our spell 
    const foundSpell = AppState.sandboxSpells[spellIndex]

    console.log('found the spell!', foundSpell);

    // create an object with the opposite boolean of the spell's prepared status from the AppState
    const spellData = { prepared: !foundSpell.prepared }

    // PUT is an update request
    // NOTE for our first argument that we pass to put, we have to specify which resource we are updating by supplying the id of that resource in the request URL
    // NOTE our second argument passed is the information that we want to change about the resource, and that must be formatted as an object. Supplying '{prepared: false}' will tell the api that I want to set the resource's prepared property to value of false
    const response = await api.put(`api/spells/${spellId}`, spellData)

    console.log('🐕🔧🔮 UPDATED SPELL', response.data);

    // the response body here is the updated resource in the database. We want to convert this into our model
    const updatedSpell = new Spell(response.data)

    // NOTE the third+ argument supplied to splice is optional, and it will be what we put in at the index after splicing data out 
    // NOTE take out the old one, and replace it with the new one
    AppState.sandboxSpells.splice(spellIndex, 1, updatedSpell)
  }
  async getMySpells() {
    const response = await api.get('api/spells')

    console.log('🐕🔮🔮🔮🔮🔮 GOT MY SPELLS', response.data);

    const newSpells = response.data.map((spellPOJO) => new Spell(spellPOJO))

    AppState.sandboxSpells = newSpells
  }
  async saveSpell() {
    // NOTE the single spell stored in the appstate that we want to save to our account
    const spellToSave = AppState.activeSpell

    const response = await api.post('api/spells', spellToSave)

    console.log('🐕✨🔮 CREATED SPELL', response.data);

    const newSpell = new Spell(response.data)

    AppState.sandboxSpells.push(newSpell)
  }
}

export const sandboxSpellsService = new SandboxSpellsService()