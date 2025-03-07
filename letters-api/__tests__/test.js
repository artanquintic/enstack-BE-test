import supertest from 'supertest';
import { server } from '../app.js';
const requestWithSupertest = supertest(server);

describe('GET /api/letters', () => {
  it('Should show all letters', async () => {
    const res = await requestWithSupertest.get('/api/letters');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ letters: ['A', 'B'] });
  });
});

describe('GET /api/letter/:letter', () => {
  it('Should return letter record', async () => {
    const res = await requestWithSupertest.get('/api/letter/A');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ letter: 'A', value: 1, strokes: 2, vowel: true });
  });
});

describe('GET /api/letter/shuffle', () => {
  it('Should shuffle and return the letters as string', async () => {
    const res = await requestWithSupertest.get('/api/letter/shuffle');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(typeof res.body).toBe('string');
  });
});

describe('GET /api/letter/filter/:val', () => {
  it('Should return records where value <= val', async () => {
    const res = await requestWithSupertest.get('/api/letter/filter/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ letters: ['A'] });
  });
});

describe('POST /api/login', () => {
  it('Should login', async () => {
    const res = await requestWithSupertest.post('/api/login').send({ username: 'abacca', password: 'accaba' });
    expect(res.status).toEqual(200);
  });
});

describe('POST /api/letter/add', () => {
  it('Should add new letter detail', async () => {
    const res = await requestWithSupertest
      .post('/api/letter/add')
      .send({ letter: 'C', value: 1, strokes: 2, vowel: true });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ status: 0 });
  });
});

afterAll(() => {
  server.close();
});
