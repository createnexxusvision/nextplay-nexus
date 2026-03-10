// NextPlay Nexus — NIL Sports Configuration v2.0

export type SportId =
  | 'football'
  | 'flag-football'
  | 'mens-basketball'
  | 'womens-basketball'
  | 'womens-soccer'
  | 'esports';

export interface Sport {
  id: SportId;
  label: string;
  shortLabel: string;
  color: string;
  gradient: string;
  motionPersonality: 'explosive' | 'fluid' | 'vertical' | 'flowing' | 'digital';
  svgBgPath: string;
  description: string;
}

export const SPORTS: Sport[] = [
  {
    id: 'football',
    label: 'Football',
    shortLabel: 'FB',
    color: '#FDB927',
    gradient: 'linear-gradient(135deg, #FDB927 0%, #B8860B 100%)',
    motionPersonality: 'explosive',
    svgBgPath: 'M0,50 L100,50 M0,30 L100,30 M0,70 L100,70 M10,0 L10,100 M90,0 L90,100',
    description: 'NIL opportunities for football athletes at high school and college level.',
  },
  {
    id: 'flag-football',
    label: "Women's Flag Football",
    shortLabel: 'WFF',
    color: '#E8C87A',
    gradient: 'linear-gradient(135deg, #E8C87A 0%, #FDB927 100%)',
    motionPersonality: 'fluid',
    svgBgPath: 'M0,50 L100,50 M20,20 L80,20 M20,80 L80,80 M50,0 L50,100',
    description: "Emerging NIL opportunities for women's flag football athletes.",
  },
  {
    id: 'mens-basketball',
    label: "Men's Basketball",
    shortLabel: 'MBB',
    color: '#4A90D9',
    gradient: 'linear-gradient(135deg, #0B1D3A 0%, #4A90D9 100%)',
    motionPersonality: 'vertical',
    svgBgPath: 'M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0-90,0 M5,50 L95,50',
    description: "Men's basketball NIL readiness tracking and opportunity management.",
  },
  {
    id: 'womens-basketball',
    label: "Women's Basketball",
    shortLabel: 'WBB',
    color: '#7B68EE',
    gradient: 'linear-gradient(135deg, #7B68EE 0%, #C084FC 100%)',
    motionPersonality: 'vertical',
    svgBgPath: 'M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0-90,0 M5,50 L95,50',
    description: "Women's basketball NIL opportunities -- one of the fastest growing segments.",
  },
  {
    id: 'womens-soccer',
    label: "Women's Soccer",
    shortLabel: 'WSC',
    color: '#1A7F5F',
    gradient: 'linear-gradient(135deg, #1A7F5F 0%, #34D399 100%)',
    motionPersonality: 'flowing',
    svgBgPath: 'M50,50 m-48,0 a48,48 0 1,0 96,0 a48,48 0 1,0-96,0 M0,50 L100,50 M50,0 L50,100',
    description: "Women's soccer NIL development at high school and collegiate levels.",
  },
  {
    id: 'esports',
    label: 'ESports',
    shortLabel: 'ESP',
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, #001824 0%, #00E5FF 100%)',
    motionPersonality: 'digital',
    svgBgPath: 'M0,0 L100,0 L100,100 L0,100 Z M10,10 L90,10 M10,90 L90,90 M0,50 L100,50 M50,0 L50,100',
    description: 'NIL opportunities in collegiate and high school competitive gaming.',
  },
];

export const getSport = (id: SportId): Sport => {
  const s = SPORTS.find(s => s.id === id);
  if (!s) throw new Error(`Sport not found: ${id}`);
  return s;
};

export const getSportColor = (id: SportId): string => getSport(id).color;
export const getSportGradient = (id: SportId): string => getSport(id).gradient;
