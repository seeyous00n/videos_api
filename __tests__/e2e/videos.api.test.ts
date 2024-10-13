import { mokBadDataCreate, mokDataCreate, req } from '../test-helpers';
import { ROUTER_PATHS, STATUS_CODE } from '../../src/settings';

describe('/videos', () => {
  beforeAll(async () => {
    await req.delete(ROUTER_PATHS.TESTING);
  });

  it('should return status 200 and empty array', async () => {
    await req
      .get(ROUTER_PATHS.VIDEOS)
      .expect(STATUS_CODE.OK_200, []);
  });

  it('should return status 404', async () => {
    await req
      .get(`${ROUTER_PATHS.VIDEOS}/2`)
      .expect(STATUS_CODE.NOT_FOUND_404);
  });

  it(`shouldn't create video with incorrect input data`, async () => {
    await req
      .post(ROUTER_PATHS.VIDEOS)
      .send(mokBadDataCreate)
      .expect(STATUS_CODE.BAD_REQUEST_400);

    await req
      .get(ROUTER_PATHS.VIDEOS)
      .expect(STATUS_CODE.OK_200, []);
  });
  
  let createdVideo = null;
  it(`should create video with correct input data`, async () => {
    const createResponse = await req
      .post(ROUTER_PATHS.VIDEOS)
      .send(mokDataCreate)
      .expect(STATUS_CODE.CREATED_201);

    createdVideo = createResponse.body;

    await req
      .get(ROUTER_PATHS.VIDEOS)
      .expect(STATUS_CODE.OK_200, [createdVideo]);
  });

  let createdVideo2 = null;
  it(`create one more video`, async () => {
    const createResponse = await req
      .post(ROUTER_PATHS.VIDEOS)
      .send(mokDataCreate)
      .expect(STATUS_CODE.CREATED_201);

    createdVideo2 = createResponse.body;

    await req
      .get(ROUTER_PATHS.VIDEOS)
      .expect(STATUS_CODE.OK_200, [createdVideo!, createdVideo2]);
  });

  it('should return video by id', async () => {
    await req
      .get(`${ROUTER_PATHS.VIDEOS}/${createdVideo!.id}`)
      .expect(STATUS_CODE.OK_200, createdVideo!);
  });

  it(`shouldn't update video with incorrect input data`, async () => {
    await req
      .put(`${ROUTER_PATHS.VIDEOS}/${createdVideo!.id}`)
      .send({ title: '' })
      .expect(STATUS_CODE.BAD_REQUEST_400);

    await req
      .get(`${ROUTER_PATHS.VIDEOS}/${createdVideo!.id}`)
      .expect(STATUS_CODE.OK_200, createdVideo!);
  });

  it(`should update video with correct input data`, async () => {
    await req
      .put(`${ROUTER_PATHS.VIDEOS}/${createdVideo!.id}`)
      .send({ ...createdVideo!, title: 'good title' })
      .expect(STATUS_CODE.NO_CONTENT_204);

    await req
      .get(`${ROUTER_PATHS.VIDEOS}/${createdVideo!.id}`)
      .expect(STATUS_CODE.OK_200, { ...createdVideo!, title: 'good title' });
  });

  it(`should delete one video by id`, async () => {
    await req
      .delete(`${ROUTER_PATHS.VIDEOS}/${createdVideo!.id}`)
      .expect(STATUS_CODE.NO_CONTENT_204);

    await req
      .get(ROUTER_PATHS.VIDEOS)
      .expect(STATUS_CODE.OK_200, [createdVideo2!]);
  });

  it(`shouldn't delete one video`, async () => {
    await req
      .delete(`${ROUTER_PATHS.VIDEOS}/123`)
      .expect(STATUS_CODE.NOT_FOUND_404);
  });

  it(`should delete all videos`, async () => {
    await req
      .delete(`/testing/all-data`)
      .expect(204);

    await req
      .get(ROUTER_PATHS.VIDEOS)
      .expect(STATUS_CODE.OK_200, []);
  });
});