import { style, query, animateChild, animate, AnimationMetadata, transition, group, trigger } from '@angular/animations';






const itemList = ["home", "login", "subscribe", "reset_password"];

const temp: AnimationMetadata[] = [];

for (let i = 0; i < itemList.length; i++) {
    for (let j = 0; j < itemList.length; j++) {
        if (itemList[i] === itemList[j]) continue;
        else {

        }

    }

}

export const slideAnimation = null;
 






/*******



const slideLeft= [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left:0,
      width: '100%'
    })
  ],{optional:true}),
  query(':enter', [
    style({ left: '-100%'})
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('600ms ease', style({ left: '100%'}))
    ]),
    query(':enter', [
      animate('600ms ease', style({ left: '0%'}))
    ])
  ]),
  query(':enter', animateChild()),
];
const slideRight= [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      right:0,

      width: '100%'
    })
  ]),
  query(':enter', [
    style({ right: '-100%'})
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('600ms ease',style({right:'100%'}))
    ],{optional:true}),
    query(':enter', [
      animate('600ms ease', style({ right: '0%'}))
    ],{optional:true})
  ]),
  query(':enter', animateChild()),
];
const fader= [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      right:0,
      opacity:0,
      width: '100%',
      transform:'scale(0) translateY(100%)'

    })
  ]),
  query(':enter', [
    animate("600ms ease",  style({ opacity: 1,transform:'scale(1) translateY(0)'}))

  ]),
  query(':enter', animateChild()),

];

   temp.push(transition(''+itemList[i]+' => '+itemList[j]+'',[
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                left:0,
                width: '100%'
              })
            ],{optional:true}),
            query(':enter', [
              style({ left: '-100%'})
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('600ms ease', style({ left: '100%'}))
              ]),
              query(':enter', [
                animate('600ms ease', style({ left: '0%'}))
              ])
            ]),
            query(':enter', animateChild()),
          ]));
          temp.push(transition(''+itemList[j]+' => '+itemList[i]+'',[
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                right:0,

                width: '100%'
              })
            ]),
            query(':enter', [
              style({ right: '-100%'})
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('600ms ease',style({right:'100%'}))
              ],{optional:true}),
              query(':enter', [
                animate('600ms ease', style({ right: '0%'}))
              ],{optional:true})
            ]),
            query(':enter', animateChild()),
          ]));
 */
