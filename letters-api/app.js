import express from 'express';
import { ExpressValidator, validationResult } from 'express-validator';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const database = [
  { letter: 'A', value: 1, strokes: 2, vowel: true },
  { letter: 'B', value: 2, strokes: 1, vowel: false }
];

const { checkSchema } = new ExpressValidator({
  isLetterUnique: value => {
    const letterExists = database.some(record => record.letter === value);
    if (letterExists) {
      throw new Error('Letter already exists');
    }
    return true;
  }
});

// Fisher-Yates shuffle
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
  return array;
};

export const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

app.post('/api/login', (req, res) => {
  if (!(req.body.username && req.body.password)) {
    return res.status(400).json({ message: 'Username and Password are required' });
  }

  const { username, password } = req.body;
  const USERNAME_FORMAT = /^[a-zA-Z]*[aA][a-zA-Z]*[bB][a-zA-Z]*[cC][a-zA-Z]*$/; // a, b, and c appears in order
  const reversedUsername = username.split('').reverse().join('');
  if (
    username.length < 4 ||
    !username.match(USERNAME_FORMAT) ||
    password.toLowerCase() !== reversedUsername.toLowerCase()
  ) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  return res.json({ message: 'Login successful' });
});

app.get('/api/letters', (_, res) => {
  const dbCopy = [...database];
  const letters = dbCopy.sort((a, b) => a['value'] - b['value']).map(({ letter }) => letter);
  return res.json({ letters });
});

app.post(
  '/api/letter/add',
  checkSchema(
    {
      letter: { isAlpha: true, isLetterUnique: true, isLength: { options: { max: 1 } } },
      value: { isInt: true },
      strokes: { isInt: true, custom: { options: (strokes, { req }) => strokes != req.body.value } },
      vowel: { isBoolean: true }
    },
    ['body']
  ),
  (req, res) => {
    // check if there's any validation error
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status: 1 });
    }

    const { letter, value, strokes, vowel } = req.body;
    if (!(letter && value && strokes && vowel)) {
      return res.status(400).json({ status: 1 });
    }
    database.push({ letter, value, strokes, vowel });
    return res.status(201).json({ status: 0 });
  }
);

app.get('/api/letter/:letter', (req, res) => {
  const letter = req.params.letter;
  if (letter == 'shuffle') {
    const shuffledArray = shuffle(database.map(({ letter }) => letter));
    const retString = shuffledArray.join('');
    return res.json(retString);
  } else {
    const data = database.find(record => record.letter === letter);
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: 'Letter not found' });
    }
  }
});

app.get('/api/letter/filter/:val', (req, res) => {
  const val = req.params.val;
  const result = database.filter(record => record.value <= val).map(({ letter }) => letter);
  return res.json({ letters: result });
});
