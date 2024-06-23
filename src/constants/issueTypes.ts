import { ViolationType, Principle } from './enums'

interface IssueType {
  type: ViolationType
  name: string
  explanation: string
  recommendations: string[]
  principle: Principle
}

export const IssueTypes: IssueType[] = [
  {
    type: ViolationType.H_1,
    name: 'Weak Point of Entry',
    explanation:
      'The point of entry is the focal point of your design. If the point of entry is weak, it is unclear what element is the most important and viewers may not recognize the key message at first sight.',
    recommendations: [
      'increase contrast using size/color\n- make title bigger/make body smaller\n- change title text color to be brighter',
      'increase contrast in text\n- make title all caps/lowercase\n- make title bold\n- make title different font',
      'use additional white space to frame key message',
    ],
    principle: Principle.Hierarchy,
  },
  {
    type: ViolationType.H_2,
    name: 'Ambiguous Levels of Importance',
    explanation:
      'If there is no distinct visual hierarchy, viewers may have trouble using visual cues to distinguish between elements of lesser or higher importance.',
    recommendations: [
      'increasing importance\n- brighter colors (e.g. using accent colors in an otherwise monochrome design)\n- increase size\n- adding white space',
      'decreasing importance\n- softer colors (e.g. shades of gray or other neutrals)\n- decrease size',
      'grouping by importance\n- matching any color/formatting treatment\n- proximity: objects that are close appear to be related',
    ],
    principle: Principle.Hierarchy,
  },
  {
    type: ViolationType.H_3,
    name: 'Unclear Grouping of Content',
    explanation:
      'If objects of similar significance or meaning are not grouped closer together, viewers may have a hard time understanding the relationship between elements.',
    recommendations: [
      'visually group related elements\n- identify elements that convey similar/related messages (or are of similar levels of visual importance) and make them spatially close to each other',
      'visually separate less related elements\n- identify elements that convey unrelated messages (or are of different levels of visual importance) and make them spatially farther away from each other',
    ],
    principle: Principle.Hierarchy,
  },
  {
    type: ViolationType.A_1,
    name: 'Arbitrary Alignment of Elements',
    explanation: "If elements aren't aligned to a common edge/axis, the design may appear scattered and disorganized.",
    recommendations: [
      'create and align common edges\n- consider aligning the edges of nearby text boxes\n- consider using the same alignment (e.g. left-justified) for related groups of text\n- consider matching alignment of overall text boxes to text alignment within the text box',
      'align text to common paths/margins\n- align to closest margin (e.g. left page margin)\n- align to common shape (e.g. image)',
    ],
    principle: Principle.Alignment,
  },
  {
    type: ViolationType.A_2,
    name: 'Insufficient Margins',
    explanation:
      'If elements are placed too close to the edge of the canvas, the viewer may find it hard to see the contents of the design as a cohesive whole.',
    recommendations: [
      'elements in the design should have breathing room/space to frame\n- consider shifting text/graphic elements away from edge of page\n- consider size of elements when determining how much white space should surround it',
      'consider if space towards center of the design is being used effectively',
    ],
    principle: Principle.Alignment,
  },
  {
    type: ViolationType.B_1,
    name: 'Not Enough Space Between Content',
    explanation: 'Leaving too little white space between design elements can make it difficult to identify sections and comfortably read content.',
    recommendations: [
      'leave white space between elements\n- move elements away from each other\n- consider size of elements when determining how much white space should surround it',
      'group similar elements together spatially, but still leaving adequate breathing room\n- consider spacing within and around a single text box',
    ],
    principle: Principle.Balance,
  },
  {
    type: ViolationType.B_2,
    name: 'Content Lacks Balance',
    explanation: "When elements of different visual weight aren't intentionally arranged, a design can appear skewed, unbalanced, and/or incohesive.",
    recommendations: [
      'balance areas of heavy visual weight (while maintaining hierarchy)\n- add or shift elements into underutilized areas\n- decrease size of images, graphic elements, and/or text to reduce weight\n- change text emphasis and styles to shift weight towards other regions',
      'consider if you want symmetric or asymmetric balance',
    ],
    principle: Principle.Balance,
  },
  {
    type: ViolationType.B_3,
    name: 'Uneven Margins',
    explanation: 'Leaving margins of different sizes around a design can make it appear unbalanced. ',
    recommendations: [
      'consider creating even margins\n- match top and bottom (also left/right) margins to be similar in size (or more intentionally different)\n- similarly adjust top/bottom margins relative to left/right',
      'create clear visual edges\n- shift text/graphics to align edges\n- make sure each edge only has one margin\n- change size of text/graphics',
    ],
    principle: Principle.Balance,
  },
  {
    type: ViolationType.U_1,
    name: 'Inconsistent/Too Many Variations in Text',
    explanation: 'Using too many variations in typefaces, font sizes, font styles, and text color can make a design look incoherent and unorganized.',
    recommendations: [
      'consider limiting number of font, font sizes, font styles, etc.\n- make similar font/font sizes the same\n- make different font/font sizes more different',
      'consider using text styles/treatments in a consistent manner\n- treat text of equal importance with same font size/color/style',
    ],
    principle: Principle.Unity,
  },
  {
    type: ViolationType.U_2,
    name: 'Unnecessary Design Elements',
    explanation: 'Adding too many graphical elements irrelevant to the key message can draw attention away from the important parts of a design.',
    recommendations: [
      'decrease clutter quantiatively\n- remove some elements (text, graphic, image, etc.)',
      'decrease clutter qualitatively\n- pick a less busy image\n- pick simpler graphics',
    ],
    principle: Principle.Unity,
  },
  {
    type: ViolationType.U_3,
    name: 'Inconsistent Color Choices',
    explanation: 'Using too many variations in color between various elements in a design can make a design look busy and inconsistent.',
    recommendations: [
      'make similar colors match',
      'consider limiting number of accent colors',
      'select colors from one type of color palette (e.g. pastel, neutrals, neon, jewel tone, etc.)',
    ],
    principle: Principle.Unity,
  },
  {
    type: ViolationType.R_1,
    name: 'Poor Text Legibility',
    explanation: 'Unclear fonts, text sizes, and spacing can make text hard to read.',
    recommendations: [
      'change the treatment of text\n- adjust (increase/decrease) font weight\n- adjust (increase/decrease) font size\n- pick font with an average amount of font weight\n- pick a more standard, less visually complex font',
      'add more contrast to text\n- add an opposite or neutral colored backdrop\n- adjust text color based on its background',
      'consider space around text\n- adjust (increase/decrease) space between letters\n- adjust (increase/decrease) space between lines',
      'consider making line lengths more even within a single text box',
    ],
    principle: Principle.Readability,
  },
  {
    type: ViolationType.R_2,
    name: 'Unsuitable Image Manipulation',
    explanation: 'If the image subject is not clear, viewers may have trouble understanding the design visually.',
    recommendations: [
      'pick a higher quality image\n- choose image with better resolution\n- choose image with clearer subject matter/less distracting background (e.g. less colors, simpler patterns, less subjects, more negative space)',
      'adjust image manipulations to increase image clarity\n- increase/decrease image contrast\n- increase/decrease image size\n- avoid warping/stretching/distorting image',
    ],
    principle: Principle.Readability,
  },
  {
    type: ViolationType.R_3,
    name: 'Obscured Content',
    explanation: 'If an element is covered by another, the message that the covered element conveys becomes lost or unclear.',
    recommendations: [
      'consider increasing contrast of text\n- choose color of higher contrast against background (neutral, complementary, accent)\n- add a solid/semi-transparent overlay between text and background\n- add a stroke/outline around text in a contrasting color (to text fill color)',
      'consider simplifying background\n- use a simpler image or solid color\n- crop image to have cleaner region as text background\n- reduce overall constrast within background\n- shift text to higher contrast/emptier spot in image',
    ],
    principle: Principle.Readability,
  },
]
