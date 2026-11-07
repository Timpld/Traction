export const PROGRAMS = [
  {
    id: 'intermediaire',
    label: 'Intermédiaire',
    semaines: [
      {
        num: 1,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '+',  label: 'Pyramide',           page: 'page-04.jpg', tractions: [5,10,12,10,5,1,1,1,1,1,1],                             dips: [5,10,18,10,5],                               pompes: [10,20,25,20,10] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Circuits',            page: 'page-05.jpg', tractions: [10,8,4,4,4,12,1,1,1,1,1,1],                            dips: [15,8,8,5,5,5,1,1,1,1,1,1,1,1,1],              pompes: [20,1,1,1,1,1,1,1,1,1] },
          { num: 3, jour: 'Jour 3', difficulte: '+',  label: 'Set barre+Routines',  page: 'page-06.jpg', tractions: [10,8,6,4,2,12,15,8,1,1],                               dips: [10,8,6,4,2,18,20,10],                         pompes: [10,10,10,10,10,1,1,1,1,1] },
          { num: 4, jour: 'Jour 4', difficulte: '+',  label: 'Circuits+Finisher',   page: 'page-07.jpg', tractions: [5,10,5,4,3,1,1,1],                                     dips: [10,15,27,104],                                pompes: [10,42,122] },
        ],
      },
      {
        num: 2,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '+',  label: 'Volume 6×10',         page: 'page-08.jpg', tractions: [10,10,10,10,10,10,6,6,6],                              dips: [18,18,18,18,18,18,9,9,9],                     pompes: [30,30,30,30,30,30,12,12,12] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Circuits+EMOM',        page: 'page-09.jpg', tractions: [12,10,5,9,9,1,1,1,1,1,1,1,1,1,1],                     dips: [18,10,18,1,1,1,1,1,1],                        pompes: [25,20,25,1,1,1] },
          { num: 3, jour: 'Jour 3', difficulte: '++', label: 'Set barre+T+D',        page: 'page-10.jpg', tractions: [12,10,8,6,4,2,2,3,4,5,6,1,1,1],                       dips: [12,10,8,6,4,2,4,5,6,7,8,1],                  pompes: [] },
          { num: 4, jour: 'Jour 4', difficulte: '~',  label: 'Isométries',           page: 'page-11.jpg', tractions: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],                     dips: [1,1,1,1,1,1,1,1,1,1,1],                      pompes: [] },
        ],
      },
      {
        num: 3,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '++', label: 'Pyramide+Routine',     page: 'page-12.jpg', tractions: [2,4,6,8,10,8,6,4,2,4,6,8,1,1,1],                      dips: [4,8,12,18,15,15,15],                          pompes: [10,15,20,25,18,16,14,12,14,16,18] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Sets+Pyramide inv.',   page: 'page-13.jpg', tractions: [2,4,6,5,5,14,12,10,8,6,4,2,1,1,1,1,1,1,1,1,1,1,1],   dips: [15,10,10,21,18,15,12,9,6,3],                  pompes: [5,10,15,28,24,20,16,12,8,4] },
          { num: 3, jour: 'Jour 3', difficulte: '+',  label: 'Circuits lesté',       page: 'page-14.jpg', tractions: [8,8,5,5,1,1,1,1,1,1,1,1,1],                            dips: [10,10,5,5,10,10,30,1],                        pompes: [20,20] },
          { num: 4, jour: 'Jour 4', difficulte: '++', label: 'Lesté+Routine iso',    page: 'page-15.jpg', tractions: [5,10,5,10,5,10,5,10,1,1,1,1],                          dips: [10,15,10,15,10,15,10,15,1,1,1,1],             pompes: [20,25,20,25,20,25,20,25,1,1,1,1] },
        ],
      },
      {
        num: 4,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '+',  label: 'Volume 3×14',          page: 'page-16.jpg', tractions: [14,14,14,1,10,1,8,1,6,1,4,1,2],                        dips: [24,24,24,10,8,6,4,2],                         pompes: [34,34,34] },
          { num: 2, jour: 'Jour 2', difficulte: '++', label: 'Stress+Intermittent',  page: 'page-17.jpg', tractions: [4,4,4,4,4,5,5,5,4,4,4,4,4],                            dips: [6,6,6,6,6,8,8,8,6,6,6,6,6],                  pompes: [] },
          { num: 3, jour: 'Jour 3', difficulte: '+',  label: 'Set barre+Routine',    page: 'page-18.jpg', tractions: [14,12,10,8,6,4,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],        dips: [14,12,10,8,6,4,2],                            pompes: [20,18,16,14,12,10] },
          { num: 4, jour: 'Jour 4', difficulte: '+',  label: 'Circuits+Iso',         page: 'page-19.jpg', tractions: [15,12,9,1,1,1],                                        dips: [20,15,10,1,1,1],                              pompes: [32,28,24,1,1,1] },
          { num: 5, jour: 'Jour 5', difficulte: '~',  label: 'Course',               page: 'page-20.jpg', tractions: [],                                                      dips: [],                                            pompes: [] },
        ],
      },
    ],
  },
  {
    id: 'confirme',
    label: 'Confirmé',
    semaines: [
      {
        num: 1,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '~',  label: 'Pyramide+Volume',      page: 'page-04.jpg', tractions: [5,10,15,10,5,10,10,10,10,1,1,1,1],                     dips: [10,20,30,20,10,1,1,1,1],                      pompes: [15,25,35,25,15,20,20,20,20] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Circuits+Routines',    page: 'page-05.jpg', tractions: [14,12,11,18,1,1,1,1,1,1,1,1,1,1,1,1],                  dips: [25,20,15,30,1,1,1],                           pompes: [30,25,20,1,1,1] },
          { num: 3, jour: 'Jour 3', difficulte: '+',  label: 'Set barre+Dégressif',  page: 'page-06.jpg', tractions: [15,13,11,9,7,8,8,8,1,1,1,1,1],                         dips: [10,12,14,16,18,15,15,15],                     pompes: [] },
          { num: 4, jour: 'Jour 4', difficulte: '~',  label: 'Circuits vitesse',     page: 'page-07.jpg', tractions: [5,5,5,5,5,5,5,5],                                      dips: [10,10,10,10,15,15,10,10],                     pompes: [10,10,10,10,10,10,10,10] },
          { num: 5, jour: 'Jour 5', difficulte: '~',  label: 'Course',               page: 'page-08.jpg', tractions: [],                                                      dips: [],                                            pompes: [] },
        ],
      },
      {
        num: 2,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '+',  label: 'Routines+Finisher',    page: 'page-09.jpg', tractions: [10,10,10,10,10,10,10,8,6,4],                            dips: [20,20,20,20,20,20,15,15,12,12,9,9,6,6],       pompes: [] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Circuits+EMOM',        page: 'page-10.jpg', tractions: [12,22,24,1,1,1,1,1,1,1,1],                              dips: [15,45,20,30,1,1,1,1,1,1],                     pompes: [30,60,20] },
          { num: 3, jour: 'Jour 3', difficulte: '~',  label: 'Course',               page: 'page-11.jpg', tractions: [],                                                      dips: [],                                            pompes: [] },
          { num: 4, jour: 'Jour 4', difficulte: '++', label: 'Set barre+Routines',   page: 'page-12.jpg', tractions: [16,16,12,12,10,10,1,1],                                 dips: [20,20,15,15,20,20,1,1],                       pompes: [] },
          { num: 5, jour: 'Jour 5', difficulte: '~',  label: 'Isométries+AMRAP',     page: 'page-13.jpg', tractions: [1,1,1,1,1,1,1,1,1,1],                                   dips: [1,1,1,1,1,1,1,1,1,1],                        pompes: [] },
        ],
      },
      {
        num: 3,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '++', label: 'Volume+Routine',       page: 'page-14.jpg', tractions: [18,18,18,18,12,10,8,4,8,10,12],                         dips: [35,35,35,35],                                 pompes: [40,40,40,40,20,18,16,14,16,18,20] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Course',               page: 'page-15.jpg', tractions: [],                                                      dips: [],                                            pompes: [] },
          { num: 3, jour: 'Jour 3', difficulte: '++', label: 'Circuits+EMOM',        page: 'page-16.jpg', tractions: [15,12,10,5,5,5,5,5,5],                                  dips: [30,20,15,10,8,8,8],                           pompes: [40,30,20,15,10,10,10] },
          { num: 4, jour: 'Jour 4', difficulte: '++', label: 'Sets+EMOM',            page: 'page-17.jpg', tractions: [2,4,6,8,5,5,10,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1],       dips: [20,10,20,1,1],                                pompes: [5,10,15] },
          { num: 5, jour: 'Jour 5', difficulte: '~',  label: 'Circuit Push+EMOM',    page: 'page-18.jpg', tractions: [],                                                      dips: [30,24,18,12,1,1,1,1],                         pompes: [15,12,9,6,15,15,15,15,15,15,15,15,15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
        ],
      },
      {
        num: 4,
        seances: [
          { num: 1, jour: 'Jour 1', difficulte: '++', label: 'Pyramide+Routines',    page: 'page-19.jpg', tractions: [10,15,20,15,10,15,2,4,6,8,12],                          dips: [20,30,40,30,20,30,4,8,12,16,20,10,10,10,10],  pompes: [] },
          { num: 2, jour: 'Jour 2', difficulte: '+',  label: 'Circuits+EMOM',        page: 'page-20.jpg', tractions: [18,14,12,5,5,5,5,5,5,5,5,5],                            dips: [32,22,18,8,8,8,8,8],                          pompes: [42,32,20,10,10,10,10,10] },
          { num: 3, jour: 'Jour 3', difficulte: '+',  label: 'Course',               page: 'page-21.jpg', tractions: [],                                                      dips: [],                                            pompes: [] },
          { num: 4, jour: 'Jour 4', difficulte: '++', label: 'Set barre+Routines',   page: 'page-22.jpg', tractions: [18,16,14,12,10,10,10,10,10,10,10,10,1,1,1,1,1,1,1,1,1], dips: [15,12,10,8,20,20,20,20,1,1,1,1,1,1,1,1,1],   pompes: [20,20,20,20] },
          { num: 5, jour: 'Jour 5', difficulte: '++', label: 'Stress+Intermittent',  page: 'page-23.jpg', tractions: [4,4,4,4,4,5,5,5,5,5,5,5,5],                             dips: [6,6,6,6,6,8,8,8,8,8,8,8,8],                  pompes: [] },
        ],
      },
    ],
  },
]
