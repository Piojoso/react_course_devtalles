const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

export interface ScrambleWordsState {
  words: string[];
  gameWordsLength: number;

  currentWord: string;
  scrambledWord: string;
  guess: string;

  points: number;
  errorCounter: number;

  maxAllowErrors: number;
  maxSkips: number;

  skipCounter: number;

  isGameOver: boolean;
}

type ScrambleWordsActions =
  | { type: "UPDATE_GUESS"; payload: { guessText: string } }
  | { type: "VALIDATE_GUESS" }
  | { type: "SKIP_GUESS" }
  | { type: "RESTART_GAME" };

export const getScrumbleWordsInitialState = (): ScrambleWordsState => {
  const words = shuffleArray(GAME_WORDS);

  return {
    words,
    gameWordsLength: GAME_WORDS.length,
    currentWord: words[0],
    scrambledWord: scrambleWord(words[0]),
    guess: "",
    points: 0,
    errorCounter: 0,
    maxAllowErrors: 3,
    skipCounter: 0,
    maxSkips: 3,
    isGameOver: false,
  };
};

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const ScrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsActions,
): ScrambleWordsState => {
  const getNextWords = () => {
    const newWords = state.words.filter((w) => w !== state.currentWord);

    return { newWords };
  };

  const validateGuess = () => {
    const { guess, currentWord } = state;

    if (guess === currentWord) {
      const { newWords } = getNextWords();

      return {
        ...state,
        words: newWords,
        points: state.points + 1,
        guess: "",
        currentWord: newWords[0],
        scrambledWord: scrambleWord(newWords[0]),
      };
    }

    const errorCounter = state.errorCounter + 1;

    return {
      ...state,
      errorCounter: errorCounter,
      guess: "",
      isGameOver: errorCounter >= state.maxAllowErrors,
    };
  };

  switch (action.type) {
    case "UPDATE_GUESS": {
      return {
        ...state,
        guess: action.payload.guessText,
      };
    }

    case "VALIDATE_GUESS":
      return validateGuess();

    case "SKIP_GUESS": {
      const { newWords } = getNextWords();

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: newWords,
        currentWord: newWords[0],
        scrambledWord: scrambleWord(newWords[0]),
        guess: "",
      };
    }

    case "RESTART_GAME":
      return getScrumbleWordsInitialState();

    default:
      return state;
  }
};
