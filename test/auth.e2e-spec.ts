import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app);
    await app.init();
  });

  it('handles a signup request', () => {
    const bodyEmail = 'test01@yopmail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: bodyEmail,
        password: 'password',
      })

      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(bodyEmail);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'test02@yopmail.com';
    // supertest librairie doesn't handle cookies for us, so we need to save it inside memory for testing
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'password' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
