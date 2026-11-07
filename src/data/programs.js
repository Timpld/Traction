export const PROGRAMS = [
  {
    id: 'intermediaire',
    label: 'Intermédiaire',
    semaines: [
      {
        num: 1,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '+',  label: 'Pyramide',           tractions: [5,10,12,10,5],                        dips: [5,10,18,10,5],                       pompes: [10,20,25,20,10] },
          { num: 2, jour: 'Mardi',   difficulte: '+',  label: 'Circuits',            tractions: [10,8,4,4,4,12],                       dips: [15,8,8,5,5,5],                       pompes: [20] },
          { num: 3, jour: 'Mercredi',difficulte: '+',  label: 'Set barre+Routines',  tractions: [10,8,6,4,2,12,15,8],                  dips: [10,8,6,4,2,18,20,10],                pompes: [10,10,10,10,10] },
          { num: 4, jour: 'Jeudi',   difficulte: '+',  label: 'Circuits+Finisher',   tractions: [5,10,5,4,3],                          dips: [10,15,27,104],                       pompes: [10,42,122] },
        ],
      },
      {
        num: 2,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '+',  label: 'Volume 6×10',         tractions: [10,10,10,10,10,10,6,6,6],             dips: [18,18,18,18,18,18,9,9,9],            pompes: [30,30,30,30,30,30,12,12,12] },
          { num: 2, jour: 'Mardi',   difficulte: '+',  label: 'Circuits+EMOM',        tractions: [12,10,5,9,9],                         dips: [18,10,18],                           pompes: [25,20,25] },
          { num: 3, jour: 'Jeudi',   difficulte: '++', label: 'Set barre+T+D',        tractions: [12,10,8,6,4,2,2,3,4,5,6],            dips: [12,10,8,6,4,2,4,5,6,7,8],           pompes: [] },
          { num: 4, jour: 'Vendredi',difficulte: '~',  label: 'Isométries',           tractions: [],                                    dips: [],                                   pompes: [] },
        ],
      },
      {
        num: 3,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '++', label: 'Pyramide+Routine',     tractions: [2,4,6,8,10,8,6,4,2,4,6,8],          dips: [4,8,12,18,15,15,15],                 pompes: [10,15,20,25,18,16,14,12,14,16,18] },
          { num: 2, jour: 'Mercredi',difficulte: '+',  label: 'Sets+Pyramide inv.',   tractions: [2,4,6,5,5,14,12,10,8,6,4,2],        dips: [15,10,10,21,18,15,12,9,6,3],         pompes: [5,10,15,28,24,20,16,12,8,4] },
          { num: 3, jour: 'Jeudi',   difficulte: '+',  label: 'Circuits lesté',       tractions: [8,8,5,5],                            dips: [10,10,5,5,10,10,30],                 pompes: [20,20] },
          { num: 4, jour: 'Samedi',  difficulte: '++', label: 'Lesté+Routine iso',    tractions: [5,10,5,10,5,10,5,10],               dips: [10,15,10,15,10,15,10,15],            pompes: [20,25,20,25,20,25,20,25] },
        ],
      },
      {
        num: 4,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '+',  label: 'Volume 3×14',          tractions: [14,14,14,1,10,1,8,1,6,1,4,1,2],     dips: [24,24,24,10,8,6,4,2],                pompes: [34,34,34] },
          { num: 2, jour: 'Mercredi',difficulte: '++', label: 'Stress+Intermittent',  tractions: [4,4,4,4,4,5,5,5,4,4,4,4,4],         dips: [6,6,6,6,6,8,8,8,6,6,6,6,6],         pompes: [] },
          { num: 3, jour: 'Vendredi',difficulte: '+',  label: 'Set barre+Routine',    tractions: [14,12,10,8,6,4,2,1,1,1,1,1,1],      dips: [14,12,10,8,6,4,2],                   pompes: [20,18,16,14,12,10] },
          { num: 4, jour: 'Samedi',  difficulte: '+',  label: 'Circuits+Iso',         tractions: [15,12,9],                            dips: [20,15,10],                           pompes: [32,28,24] },
          { num: 5, jour: 'Dimanche',difficulte: '~',  label: 'Course',               tractions: [],                                   dips: [],                                   pompes: [] },
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
          { num: 1, jour: 'Lundi',   difficulte: '+',  label: 'Pyramide+Volume',      tractions: [5,10,15,10,5,10,10,10,10],           dips: [10,20,30,20,10],                     pompes: [15,25,35,25,15,20,20,20,20] },
          { num: 2, jour: 'Mardi',   difficulte: '+',  label: 'Circuits+EMOM',        tractions: [14,12,11,18],                        dips: [25,20,15,30],                        pompes: [30,25,20] },
          { num: 3, jour: 'Jeudi',   difficulte: '+',  label: 'Set barre+Dégressif',  tractions: [15,13,11,9,7,8,8,8],                 dips: [10,12,14,16,18,15,15,15],            pompes: [] },
          { num: 4, jour: 'Vendredi',difficulte: '~',  label: 'Circuits vitesse',     tractions: [5,5,5,5,5,5,5,5],                   dips: [10,10,10,10,15,15,10,10],            pompes: [10,10,10,10,10,10,10,10] },
          { num: 5, jour: 'Samedi',  difficulte: '~',  label: 'Course',               tractions: [],                                   dips: [],                                   pompes: [] },
        ],
      },
      {
        num: 2,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '+',  label: 'Routines+Finisher',    tractions: [10,10,10,10,10,10,10,8,6,4],         dips: [20,20,20,20,20,20,15,15,12,12,9,9,6,6], pompes: [] },
          { num: 2, jour: 'Mardi',   difficulte: '+',  label: 'Circuits+EMOM',        tractions: [12,22,24],                           dips: [15,45,20,30],                        pompes: [30,60,20] },
          { num: 3, jour: 'Mercredi',difficulte: '~',  label: 'Course',               tractions: [],                                   dips: [],                                   pompes: [] },
          { num: 4, jour: 'Vendredi',difficulte: '++', label: 'Set barre+Routines',   tractions: [16,16,12,12,10,10],                  dips: [20,20,15,15,20,20],                  pompes: [] },
          { num: 5, jour: 'Samedi',  difficulte: '~',  label: 'Isométries+AMRAP',     tractions: [],                                   dips: [],                                   pompes: [] },
        ],
      },
      {
        num: 3,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '++', label: 'Volume+Routine',       tractions: [18,18,18,18,12,10,8,4,8,10,12],      dips: [35,35,35,35],                        pompes: [40,40,40,40,20,18,16,14,16,18,20] },
          { num: 2, jour: 'Mardi',   difficulte: '+',  label: 'Course',               tractions: [],                                   dips: [],                                   pompes: [] },
          { num: 3, jour: 'Mercredi',difficulte: '++', label: 'Circuits+EMOM',        tractions: [15,12,10,5,5,5,5,5,5],               dips: [30,20,15,10,8,8,8],                  pompes: [40,30,20,15,10,10,10] },
          { num: 4, jour: 'Vendredi',difficulte: '++', label: 'Sets+EMOM',            tractions: [2,4,6,8,5,5,10,2,2,2,2],             dips: [20,10,20],                           pompes: [5,10,15] },
          { num: 5, jour: 'Samedi',  difficulte: '~',  label: 'Circuit Push+EMOM',    tractions: [],                                   dips: [30,24,18,12],                        pompes: [15,12,9,6,15,15,15,15,15,15,15,15,15,15] },
        ],
      },
      {
        num: 4,
        seances: [
          { num: 1, jour: 'Lundi',   difficulte: '++', label: 'Pyramide+Routines',    tractions: [10,15,20,15,10,15,2,4,6,8,12],       dips: [20,30,40,30,20,30,4,8,12,16,20,10,10,10,10], pompes: [] },
          { num: 2, jour: 'Mardi',   difficulte: '+',  label: 'Circuits+EMOM',        tractions: [18,14,12,5,5,5,5,5,5,5,5,5],         dips: [32,22,18,8,8,8,8,8],                 pompes: [42,32,20,10,10,10,10,10] },
          { num: 3, jour: 'Mercredi',difficulte: '+',  label: 'Course',               tractions: [],                                   dips: [],                                   pompes: [] },
          { num: 4, jour: 'Jeudi',   difficulte: '++', label: 'Set barre+Routines',   tractions: [18,16,14,12,10,10,10,10,10,10,10,10], dips: [15,12,10,8,20,20,20,20],            pompes: [20,20,20,20] },
          { num: 5, jour: 'Samedi',  difficulte: '++', label: 'Stress+Intermittent',  tractions: [4,4,4,4,4,5,5,5,5,5,5,5,5],         dips: [6,6,6,6,6,8,8,8,8,8,8,8,8],         pompes: [] },
        ],
      },
    ],
  },
]
