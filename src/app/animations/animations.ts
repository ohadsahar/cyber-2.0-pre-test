import { trigger, style, state } from '@angular/animations';

export const changedirection = trigger('changedirection', [

  state('front', style({transform: 'rotateY(0deg)'})),
  state('right', style({transform: 'rotateY(90deg)'})),
  state('back', style({transform: 'rotateY(180deg'})),
  state('left', style({transform: 'rotateY(-90deg)'})),
  state('top', style({transform: 'rotateX(90deg)'})),
  state('bottom', style({transform: 'rotateX(-90deg)'}))

]);

