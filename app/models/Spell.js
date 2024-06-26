export class Spell {
  constructor(data) {
    // save the id from sandbox, or set it to string with no value
    this.id = data.id || ''
    this.name = data.name
    // FIXME this is going to cause issues
    // NOTE join is an array method that joins an array of strings into one single string with an optional seperator supplied as an argument
    this.description = data.desc?.join('<br><br>') || data.description
    // NOTE if damage is falsy (undefined) default to ''. This only works if we use elvis operator
    // NOTE check to see if damage is a string (came from codeworks API). If it is a string, save it to the model. Otherwise, check to see if we can drill into the object. If we can, save then name from the object. If we can't, save an empty string
    this.damage = typeof data.damage == 'string' ? data.damage : data.damage?.damage_type.name || ''
    this.level = data.level
    this.range = data.range
    // NOTE if material is falsy (undefined) default to ''
    // FIXME maybe update the API maxLength on this one
    this.material = data.material || ''
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.casting_time
    this.duration = data.duration
    this.prepared = data.prepared || false
    this.components = data.components.map(component => {
      switch (component) {
        case 'V':
          return 'Visual'
        case 'S':
          return 'Somatic'
        case 'M':
          return 'Material'
      }
    })
  }

  get detailsHTMLTemplate() {
    return `
    <div class="p-3">
      <h1>${this.name}</h1>
      <div>
        <button onclick="app.SandboxSpellsController.saveSpell()" class="btn btn-danger">
         <i class="mdi mdi-feather"></i> Save Spell
        </button>
      </div>
      <p class="fs-4">Level ${this.level} ${this.damage} spell with a range of ${this.range}</p>
      <p class="fs-4">
        This ${this.ritual ? 'is' : 'is not'} a ritual spell that will need ${this.material ? this.material : 'nothing.'}
      </p>
      <p class="fs-4">
        Concentration is ${this.concentration ? 'required' : 'not required'} with a casting time of ${this.castingTime} that ${this.duration == 'Instantaneous' ? 'is instantaneous' : `will last ${this.duration}`}.
        </p>
      <p class="fs-4">${this.components.join(', ')}</p>
      <p class="fs-5">${this.description}</p>
    </div>
    `
  }

  get mySpellListHTMLTemplate() {
    return `
      <div class="d-flex gap-1 align-items-center">
        <input onchange="app.SandboxSpellsController.toggleSpellPreparation('${this.id}')" type="checkbox" class="checky" ${this.prepared ? 'checked' : ''}>
        <button class="d-block btn btn-outline-info mb-1 w-100">${this.name}</button>
      </div>
    `
  }
}

// NOTE schema from Sandbox API
// ✅ name: String, required
// ✅ description: String, required
// ✅ damage: String,
// ✅ level: Number,
// ✅ range: String, required
// ✅ material: String,
// ✅ ritual: Boolean,
// ✅ concentration: Boolean,
// ✅ castingTime: String,
// ✅ duration: String, required
// ✅ components: String[],
// ✅ prepared: Boolean default false,

// const rawSpellData = {
//   "index": "call-lightning",
//   "name": "Call Lightning",
//   "desc": [
//     "A storm cloud appears in the shape of a cylinder that is 10 feet tall with a 60-foot radius, centered on a point you can see 100 feet directly above you. The spell fails if you can't see a point in the air where the storm cloud could appear (for example, if you are in a room that can't accommodate the cloud).",
//     "When you cast the spell, choose a point you can see within range. A bolt of lightning flashes down from the cloud to that point. Each creature within 5 feet of that point must make a dexterity saving throw. A creature takes 3d10 lightning damage on a failed save, or half as much damage on a successful one. On each of your turns until the spell ends, you can use your action to call down lightning in this way again, targeting the same point or a different one.",
//     "If you are outdoors in stormy conditions when you cast this spell, the spell gives you control over the existing storm instead of creating a new one. Under such conditions, the spell's damage increases by 1d10."
//   ],
//   "higher_level": [
//     "When you cast this spell using a spell slot of 4th or higher level, the damage increases by 1d10 for each slot level above 3rd."
//   ],
//   "range": "120 feet",
//   "components": [
//     "V",
//     "S"
//   ],
//   "ritual": false,
//   "duration": "Up to 10 minutes",
//   "concentration": true,
//   "casting_time": "1 action",
//   "level": 3,
//   "damage": {
//     "damage_type": {
//       "index": "lightning",
//       "name": "Lightning",
//       "url": "/api/damage-types/lightning"
//     },
//     "damage_at_slot_level": {
//       "3": "3d10",
//       "4": "4d10",
//       "5": "5d10",
//       "6": "6d10",
//       "7": "7d10",
//       "8": "8d10",
//       "9": "9d10"
//     }
//   },
//   "area_of_effect": {
//     "type": "sphere",
//     "size": 5
//   },
//   "school": {
//     "index": "conjuration",
//     "name": "Conjuration",
//     "url": "/api/magic-schools/conjuration"
//   },
//   "classes": [
//     {
//       "index": "druid",
//       "name": "Druid",
//       "url": "/api/classes/druid"
//     }
//   ],
//   "subclasses": [
//     {
//       "index": "lore",
//       "name": "Lore",
//       "url": "/api/subclasses/lore"
//     },
//     {
//       "index": "land",
//       "name": "Land",
//       "url": "/api/subclasses/land"
//     }
//   ],
//   "url": "/api/spells/call-lightning"
// }