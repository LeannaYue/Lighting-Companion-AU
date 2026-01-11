import { Term, Standard, Download } from './types';

export const TERMS: Term[] = [
  // 第一部分：物理与光度学核心
  {
    id: 'p1',
    name: 'Luminous Flux (Φ)',
    category: 'Physics',
    definition: 'Measured in Lumens (lm). The total quantity of visible light emitted by a source per unit of time.',
    analogy: 'Think of a tap: Luminous flux is the total volume of water flowing out of the tap every second.'
  },
  {
    id: 'p2',
    name: 'Luminous Intensity (I)',
    category: 'Physics',
    definition: 'Measured in Candela (cd). The light-emitting capacity of a source in a specific direction.',
    analogy: 'The pressure of a specific stream of water from a showerhead directed at a single point.'
  },
  {
    id: 'p3',
    name: 'Illuminance (E)',
    category: 'Physics',
    definition: 'Measured in Lux (lx). Luminous flux falling on a unit area. AS/NZS 1680.2.2 requires 320 lx for standard offices.',
    analogy: 'How wet a specific tile on the floor gets. Closer tiles receive more water (lux) per m².',
    formulaId: 'f4' // Link to Lumen Method
  },
  {
    id: 'p4',
    name: 'Luminance (L)',
    category: 'Physics',
    definition: 'Measured in cd/m². The brightness of a surface as perceived by the human eye. The only quantity we actually "see".',
    analogy: 'The "glare" you see reflecting off a puddle, rather than the light source itself.',
    formulaId: 'f8' // Link to new Lambertian Luminance formula
  },
  {
    id: 'p5',
    name: 'Reflectance (ρ)',
    category: 'Physics',
    definition: 'Ratio of reflected to incident flux. AU standards recommend Ceiling ≥ 0.7, Walls 0.5–0.7.',
    analogy: 'A mirror bounces almost all light, while charcoal absorbs almost everything.'
  },

  // 第二部分：关键设计指标与效率
  {
    id: 'm1',
    name: 'Light Output Ratio (LOR)',
    category: 'Design Metrics',
    definition: 'Ratio of luminaire output to internal light source output. Measures optical efficiency.',
    analogy: 'How much coffee reaches your cup versus how much gets stuck in the filter.'
  },
  {
    id: 'm2',
    name: 'Maintenance Factor (MF)',
    category: 'Design Metrics',
    definition: 'MF = LLMF × LSF × LMF × RSMF. Accounts for light loss due to aging and dirt over time.',
    analogy: 'Planning a trip assuming your car will get slightly less efficient as it gets dirtier.',
    formulaId: 'f7'
  },
  {
    id: 'm3',
    name: 'Uniformity (U0)',
    category: 'Design Metrics',
    definition: 'Ratio of minimum (Emin) to average (Eavg) illuminance. AS 1680 usually requires U0 ≥ 0.4.',
    analogy: 'An even coat of paint. Patchy spots mean low uniformity.'
  },
  {
    id: 'm4',
    name: 'Unified Glare Rating (UGR)',
    category: 'Design Metrics',
    definition: 'Psychological metric for discomfort glare. Office environments usually require UGR ≤ 19.',
    analogy: 'The "volume" of light. High UGR is like loud, distracting noise for your eyes.'
  },
  {
    id: 'm5',
    name: 'Lighting Power Density (LPD)',
    category: 'Design Metrics',
    definition: 'W/m² limits for energy efficiency. Regulated strictly by NCC (BCA) Section J6.',
    analogy: 'A "fuel budget" for the building’s lighting energy consumption.',
    formulaId: 'f6'
  },
  {
    id: 'm6',
    name: 'Cut-off Angle',
    category: 'Design Metrics',
    definition: 'Angle below which light is shielded to control glare. Shielding Angle = 90° - Cut-off.',
    analogy: 'A baseball cap visor blocking direct sun while letting you see the field.'
  },
  {
    id: 'm7',
    name: 'IP Rating',
    category: 'Design Metrics',
    definition: 'Ingress Protection (e.g., IP65). First digit is dust, second is water protection.',
    analogy: 'The "armor class" determining how well a fitting survives harsh environments.'
  },

  // 第三部分：视觉、感知与色彩
  {
    id: 'v1',
    name: 'Photopic / Scotopic Vision',
    category: 'Vision',
    definition: 'Vision in high-light (cones) vs low-light (rods). Important for AU road lighting (Mesopic).',
    analogy: 'Switching between a high-res color camera and a grainy night-vision lens.'
  },
  {
    id: 'v2',
    name: 'Purkinje Shift',
    category: 'Vision',
    definition: 'Sensitivity shift towards blue wavelengths as luminance levels drop.',
    analogy: 'Why red flowers look black at dusk, but blue ones still look vibrant.'
  },
  {
    id: 'v3',
    name: 'CCT (Color Temperature)',
    category: 'Vision',
    definition: 'Measured in Kelvin (K). 3000K is warm/yellow, 4000K is neutral/white.',
    analogy: 'Comparing the warm glow of a candle to the cool, crisp light of an overcast sky.'
  },
  {
    id: 'v4',
    name: 'CRI / Ra',
    category: 'Vision',
    definition: 'Source’s ability to reveal colors. AU office standards require Ra ≥ 80.',
    analogy: 'High CRI is like high-fidelity audio; low CRI is like a muffled radio station.'
  },
  {
    id: 'v5',
    name: 'MacAdam Ellipse (SDCM)',
    category: 'Vision',
    definition: 'Measures LED color consistency. 3-step SDCM is the standard for high-end projects.',
    analogy: 'Ensuring every "white" tile in a floor matches exactly, without subtle tints.'
  },

  // 第四部分：定性分析与主观哲学
  {
    id: 's1',
    name: "Richard Kelly's Typology",
    category: 'Narrative',
    definition: 'Ambient Luminescence (Base), Focal Glow (Emphasis), Play of Brilliants (Decorative).',
    analogy: 'The layers of a play: Stage light, Spotlights on actors, and Sparklers for effects.'
  },
  {
    id: 's2',
    name: "Flynn's Impressions",
    category: 'Narrative',
    definition: 'Using light distribution to create Spaciousness, Relaxation, and Clarity.',
    analogy: 'Painting the mood of a room using shadows and focus rather than just furniture.'
  },
  {
    id: 's3',
    name: 'Post-Occupancy Evaluation (POE)',
    category: 'Narrative',
    definition: 'Systematic study of light quality using measurement and Semantic Differential Scales.',
    analogy: 'A "performance review" for the building after people have actually moved in.'
  },
  {
    id: 's4',
    name: 'Wayfinding',
    category: 'Narrative',
    definition: 'Using contrast and color as visual cues to help users navigate complex spaces.',
    analogy: 'Using "light crumbs" like Hansel and Gretel to lead people to the exit.'
  }
];

export const STANDARDS: Standard[] = [
  {
    id: 's0',
    code: 'AS/NZS 1680.0:2009',
    title: 'Interior lighting - Safe movement',
    luxLevels: [
      { task: 'Throughout publicly accessible areas', lux: 20 }
    ]
  },
  {
    id: 's1',
    code: 'AS/NZS 1680.1:2006',
    title: 'General principles and recommendations',
    luxLevels: [
      { task: 'Movement & Orientation', lux: 40, ugr: 'N/A' },
      { task: 'Rough Intermittent Tasks', lux: 80, ugr: 'N/A' },
      { task: 'Simple Office / Waiting Rooms', lux: 160, ugr: 22 }
    ]
  },
  {
    id: 's21',
    code: 'AS/NZS 1680.2.1:2008',
    title: 'Circulation spaces and other general areas',
    luxLevels: [
      { task: 'Entrance halls, lobbies, foyers', lux: 160, ugr: 'N/A' },
      { task: 'Corridors, passageways', lux: 40, ugr: 'N/A' },
      { task: 'Stairs (internal)', lux: 80, ugr: 'N/A' },
      { task: 'Toilets', lux: 80, ugr: 'N/A' }
    ]
  },
  {
    id: 's22',
    code: 'AS/NZS 1680.2.2:2008',
    title: 'Office and screen-based tasks',
    luxLevels: [
      { task: 'Normal Office Work', lux: 320, ugr: 19 },
      { task: 'Drafting Boards', lux: 600, ugr: 16 },
      { task: 'Technical Data Entry', lux: 400, ugr: 19 },
      { task: 'Keyboards (SBE)', lux: 160, ugr: 19 }
    ]
  },
  {
    id: 's23',
    code: 'AS/NZS 1680.2.3:2008',
    title: 'Educational and training facilities',
    luxLevels: [
      { task: 'General purpose classrooms', lux: 240, ugr: 19 },
      { task: 'Laboratories', lux: 320, ugr: 19 },
      { task: 'Reading rooms / Libraries', lux: 320, ugr: 19 },
      { task: 'Sewing rooms (Task area)', lux: 800, ugr: 'N/A' }
    ]
  },
  {
    id: 's24',
    code: 'AS/NZS 1680.2.4:2017',
    title: 'Industrial tasks and processes',
    luxLevels: [
      { task: 'Rough bench or machine work', lux: 240, ugr: 22 },
      { task: 'Medium bench or machine work', lux: 400, ugr: 19 },
      { task: 'Fine bench or machine work', lux: 800, ugr: 19 },
      { task: 'Extra-fine bench work', lux: 1200, ugr: 16 }
    ]
  },
  {
    id: 's25',
    code: 'AS/NZS 1680.2.5:2018',
    title: 'Hospital and medical tasks',
    luxLevels: [
      { task: 'Wards - General lighting', lux: 160, ugr: 'D/G' },
      { task: 'Wards - Bedhead reading', lux: 240, ugr: 'D/G' },
      { task: 'Type A Treatment (Anaesthesia)', lux: 400, ugr: 'N/A' },
      { task: 'Type B Treatment (Skin Obs)', lux: 320, ugr: 19 }
    ]
  },
  {
    id: 's5',
    code: 'AS/NZS 1680.5:2012',
    title: 'Outdoor workplace lighting',
    luxLevels: [
      { task: 'Assembly, fabrication (Outdoor)', lux: 80, ugr: '45 GR' },
      { task: 'Loading/Unloading forklift', lux: 40, ugr: '45 GR' },
      { task: 'Storage with through traffic', lux: 20, ugr: '50 GR' }
    ]
  },
  {
    id: 's4',
    code: 'AS/NZS 1680.4:2017',
    title: 'Maintenance of electric lighting systems',
    luxLevels: [
      { task: 'Clean Environment Interval', lux: 3, ugr: 'Years' },
      { task: 'Normal Environment Interval', lux: 2, ugr: 'Years' },
      { task: 'Dirty Environment Interval', lux: 1, ugr: 'Year' }
    ]
  }
];

export const DOWNLOADS: Download[] = [
  { id: 'as1680_0', name: 'AS/NZS 1680.0:2009 Safe Movement', filename: 'AS_NZS_1680.0_2009.pdf', size: '1.2 MB' },
  { id: 'as1680_1', name: 'AS/NZS 1680.1:2006 General Principles', filename: 'AS_NZS_1680.1_2006.pdf', size: '4.5 MB' },
  { id: 'as1680_2_1', name: 'AS/NZS 1680.2.1:2008 Circulation', filename: 'AS_NZS_1680.2.1_2008.pdf', size: '2.1 MB' },
  { id: 'as1680_2_2', name: 'AS/NZS 1680.2.2:2008 Office & Screen', filename: 'AS_NZS_1680.2.2_2008.pdf', size: '2.8 MB' },
  { id: 'as1680_2_3', name: 'AS/NZS 1680.2.3:2008 Educational', filename: 'AS_NZS_1680.2.3_2008.pdf', size: '2.4 MB' },
  { id: 'as1680_2_4', name: 'AS/NZS 1680.2.4:2017 Industrial', filename: 'AS_NZS_1680.2.4_2017.pdf', size: '3.1 MB' },
  { id: 'as1680_2_5', name: 'AS/NZS 1680.2.5:2018 Hospital', filename: 'AS_NZS_1680.2.5_2018.pdf', size: '3.3 MB' },
  { id: 'as1680_3', name: 'AS/NZS 1680.3:2017 Photometric Data', filename: 'AS_NZS_1680.3_2017.pdf', size: '2.9 MB' },
  { id: 'as1680_4', name: 'AS/NZS 1680.4:2017 Maintenance', filename: 'AS_NZS_1680.4_2017.pdf', size: '2.2 MB' },
  { id: 'as1680_5', name: 'AS/NZS 1680.5:2012 Outdoor', filename: 'AS_NZS_1680.5_2012.pdf', size: '2.6 MB' },
  { id: 'ncc_j6', name: 'NCC 2022 Section J6 Power Limits', filename: 'ncc_section_j6.pdf', size: '1.8 MB' }
];