import { mokBadDataCreate, mokDataCreate, req } from '../test-helpers';
import { STATUS_CODE } from '../../src/settings';


describe('/videos', () => {
  beforeAll(async () => {
    await req.delete('/testing/all-data');
  });

  it('should return status 200 and empty array', async () => {
    await req
      .get('/videos')
      .expect(STATUS_CODE.OK_200, []);
  });

  it('should return status 204', async () => {
    await req
      .get('/videos/234324')
      .expect(STATUS_CODE.NOT_FOUND_404);
  });

  it(`shouldn't create video with incorrect input data`, async () => {
    await req
      .post('/videos')
      .send(mokBadDataCreate)
      .expect(STATUS_CODE.BAD_REQUEST_400);

    await req
      .get('/videos')
      .expect(STATUS_CODE.OK_200, []);
  });


  let createdVideo = null;
  it(`should create video with correct input data`, async () => {
    const createResponse = await req
      .post('/videos')
      .send(mokDataCreate)
      .expect(STATUS_CODE.CREATED_201);

    createdVideo = createResponse.body;

    await req
      .get('/videos')
      .expect(STATUS_CODE.OK_200, [createdVideo]);
  });

  it('should return video by id', async () => {
    await req
      .get(`/videos/${createdVideo!.id}`)
      .expect(STATUS_CODE.OK_200, createdVideo!);
  });

});