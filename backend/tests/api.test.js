const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  it('should return API status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('DebugQuest API v1.0');
  });

  it('should return 401 for unauthorized /auth/me', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.statusCode).toEqual(401);
  });

  it('should return analytics overview', async () => {
    const res = await request(app).get('/analytics/overview');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('totalXP');
  });
});
