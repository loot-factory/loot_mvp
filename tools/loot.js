const lists = [
  [
    'Acid Blood',
    'Acid Spit',
    'Bone Saw',
    'Brain Melter',
    'Despair Wrap',
    'Exoskeleton',
    'Fear Sensor',
    'Flying Needles',
    'Heart Spike',
    'Heat Spear',
    'Heat Swamp',
    'Knife Cluster',
    'Laser Wand',
    'Love Scent',
    'Mandible Crush',
    'Pulse Weapon',
    'Quantum Eye',
    'Snow Grenade',
    'Trident Head',
    'Wry Smile',
  ],
  [
    'Armored Hide',
    'Cluster Web',
    'Drone Shield',
    'Grease Glands',
    'Heat Shield',
    'Ignition Block',
    'Invisible Shield',
    'Kinetic Shield',
    'Pain Pulse',
    'Shadow Play',
    'Sonic Pulse',
    'Time Warper',
    'Toxic Cloud',
    'Truth Spray',
    'Vibration Grip',
    'Wound Heal',
  ],
  [
    'Brain Uplink',
    'Enhancer Gland',
    'Eye Cluster',
    'Eye Glass',
    'Gold Helmet',
    'Head Band',
    'Head Crown',
    'Head Spikes',
    'Head Shield',
    'HUD Unit',
    'Lead Dome',
    'Mind Gland',
    'Mind Melder',
    'Vision',
    '4D Head Unit',
  ],
  [
    'Bone Satchel',
    'Exo Harness',
    'Iron Harness',
    'Palladium Band',
    'Sash',
    'Satin Sash',
    'Tactical Belt',
    'Web Mesh',
  ],
  [
    'Air Fins',
    'Armoured Feet',
    'Foot Tentacles',
    'Foot Thrusters',
    'Gravity Feet',
    'Gravity Limbs',
    'Moon Boots',
    'Shin Darts',
    'Speed Runners',
    'Suction Cups',
    'Webbed Fins',
  ],
  [
    'Atmos Bubble',
    'Atmos Suit',
    'Body Cloak',
    'Flight Cape',
    'Flight Skin',
    'Heat Wrap',
    'Invisibility Wrap',
    'Kinetic Armour',
    'Kinetic Suit',
    'Life Orb',
    'Quantum Cover',
    'Scaled Body',
    'Skin Suit',
    'Shimmer Suit',
  ],
  [
    'Beams',
    'Erotic Head',
    'Gold Crystal',
    'Herb',
    'Kill Switch',
    'Orb',
    'Serum',
    'Truth Cube',
    'Visions',
    'Worm',
  ],
  [
    'of Brilliance',
    'of Chance',
    'of Deceit',
    'of Defiance',
    'of Fire',
    'of Indignity',
    'of Opportunity',
    'of Pain',
    'of Pleasure',
    'of Reasoning',
    'of Skill',
    'of Star Fire',
    'of Torment',
    'of Treason',
    'of Vice',
    'of Victory',
    'of Waste',
  ],
  [
    'Adultering',
    'Ball Breaking',
    'Bawdy',
    'Boring',
    'Brilliant',
    'Caustic',
    'Clairvoyant',
    'Credible',
    'Crushing',
    'Dastardly',
    'Delinquent',
    'Dignified',
    'Dire',
    'Disgruntled',
    'Distinguished',
    'Doomed',
    'Driven',
    'Eccentric',
    'Eclectic',
    'Eponymous',
    'Fatal',
    'Fictional',
    'Fiendish',
    'Foolhardy',
    'Fortuitous',
    'Gaudy',
    'Ghastly',
    'Gorgeous',
    'Graphic',
    'Grimy',
    'Heavy',
    'Hellish',
    'Honorable',
    'Horrific',
    'Hypnotic',
    'Idiotic',
    'Ingenious',
    'Inquisitive',
    'Insidious',
    'Insightful',
    'Intellectual',
    'Intimidating',
    'Judicious',
    'Kindhearted',
    'Kitsch',
    'Kooky',
    'Languid',
    'Lawful',
    'Lifeless',
    'Loquacious',
    'Lustful',
    'Miraculous',
    'Mysterious',
    'Nefarious',
    'Nightmarish',
    'Notorious',
    'Nuanced',
    'Oblivious',
    'Obnoxious',
    'Obstinate',
    'Omniscient',
    'Painful',
    'Playful',
    'Raging',
    'Rambunctious',
    'Ridiculous',
    'Ruptured',
    'Salacious',
    'Slick',
    'Spiffing',
    'Spirited',
    'Stupendous',
    'Tormented',
    'Torrid',
    'Tumultuous',
    'Ubiquitous',
    'Unadulterated',
    'Unhinged',
    'Uniformed',
    'Vengeful',
    'Vicious',
    'Victorious',
    'Voluptuous',
    'Whimpering',
    'Woeful',
    'Wondrous',
    'Xenophobic',
    'Yummy',
  ],
  [
    'Boss',
    'Beast',
    'Behemoth',
    'Brute',
    'Champion',
    'Deal Breaker',
    'Deviant',
    'Grip',
    'Hero',
    'Hitman',
    'Howl',
    'Insider',
    'Judge',
    'Killer',
    'King',
    'Kraken',
    'Loathing',
    'Maelstrom',
    'Onslaught',
    'Prince',
    'Rider',
    'Simp',
    'Snarl',
    'Shadow',
    'Stalker',
    'Time Stamp',
    'Yob',
  ],
];

const headers = [
  'WEAPON',
  'DEFENSE',
  'HEAD WEAR',
  'WAIST WEAR',
  'LEG WEAR',
  'TORSO WEAR',
  'PRECIOUS OBJECT',
];

let gPos = 0;
let bPos = '';
let bStrings = '';
let lNum = '';

for (let i = 0; i < lists.length; ++i) {
  const list = lists[i];
  lNum = lNum + list.length.toString(16).padStart(4, '0');
  lNum = lNum + (bPos.length / 2).toString(16).padStart(4, '0');
  for (let j = 0; j < list.length; ++j) {
    bPos = bPos + gPos.toString(16).padStart(4, '0');
    gPos += list[j].length;
    for (let k = 0; k < list[j].length; ++k)
      bStrings = bStrings + list[j].charCodeAt(k).toString(16).padStart(2, '0');
  }
  bPos = bPos + gPos.toString(16).padStart(4, '0');
}

let hPos = 2 + headers.length;
let hNum = headers.length.toString(16).padStart(2, '0');
let hStrings = '';
for (let i = 0; i < headers.length; ++i) {
  hNum = hNum + hPos.toString(16).padStart(2, '0');
  hPos += headers[i].length;
  for (let j = 0; j < headers[i].length; ++j)
    hStrings =
      hStrings + headers[i].charCodeAt(j).toString(16).padStart(2, '0');
}
hNum = hNum + hPos.toString(16).padStart(2, '0');

console.log(hNum+hStrings);
console.log(bPos);
console.log(bStrings);
console.log(lNum);
