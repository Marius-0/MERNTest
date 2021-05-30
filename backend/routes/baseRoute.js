import express from 'express'

function getRoute(contoller){
  const router = express.Router();
  router.route('/').get(contoller.get);
  router.route('/:id').get(contoller.getById);
  router.route('/').post(contoller.create);
  return router;
}

export default getRoute