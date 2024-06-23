import { Principle } from './enums'

export const Principles = {
  [Principle.Hierarchy]: {
    name: 'Hierarchy',
    explanation: `Hierarchy refers to relative importance of elements on the canvas -- it can be achieved through using size, color, contrast, and white space (spacing) to emphasize certain characteristics of the design. It is particularly important to consider where the viewers' eyes are first drawn, this should be the most important element.
    
    By utilizing hierarchy properly, you can better understand how to draw attention to specific elements of your piece and guide a viewer's eyes to attend to different parts of your design in the order of their importance.`,
    color: '#6dccda',
  },
  [Principle.Alignment]: {
    name: 'Alignment',
    explanation: `Alignment refers to the arrangement of graphics and text in relation to both the various edges/margins of the canvas as well as the elements within the canvas.
    
    Alignment can be used to visually group or separate objects. The closer objects are in space, the more noticeable a difference in alignment will be to the viewer's eyes.`,
    color: '#729ece',
  },
  [Principle.Balance]: {
    name: 'Balance',
    explanation: `Balance refers to offsetting how the graphical weight of components balance with each other on either side of a design to create satisfaction, completion, and cohesion.
    
    Achieving balance does not imply that the layout should be completely symmetrical -- in fact, it is still important to have a focal point and contrast. It just means that the designer should consider how the layout of elements and white space might create feelings of imbalance/discomfort and should be intentional about doing so.`,
    color: '#ff9e4a',
  },
  [Principle.Unity]: {
    name: 'Unity',
    explanation: `Unity refers to creating a more unified and cohesive design. A more focused design will help pull the elements together and make each element feel like it belongs in the design.
    
    By making any differences in design choices more intentional, viewers can also use this information to better interpret and understand the design -- e.g. they can assume that a difference in font weight implies a difference in relative importance.`,
    color: '#67bf5c',
  },
  [Principle.Readability]: {
    name: 'Readability',
    explanation: `Readability refers to how easy or difficult it is to read and follow the visual content in the design, in terms of both the text and imagery.
    
    Good readability can be achieved by using clear graphics and fonts that are legible or easy to read, as well as heavier font weights and colors with higher contrast.`,
    color: '#ed665d',
  },
}
