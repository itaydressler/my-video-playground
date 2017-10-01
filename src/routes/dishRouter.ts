import * as express from 'express';
import {Dishes, IDish} from '../models/dishes';

const dishRouter = express.Router();
const baseRoute = dishRouter.route('/');
const itemRoute = dishRouter.route('/:itemId');


baseRoute.get((req, res, next) => {
  Dishes.find({}, (err, dish) => {
    if (err) {
      next(err);
      return;
    }
    res.json(dish);
  })
});

baseRoute.post((req, res, next) => {
  Dishes.create(req.body, (err, dish: IDish) => {
    if (err) {
      next(err);
      return;
    }

    console.log('Dish created');
    const id = dish._id;

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the dish with id: ' + id);
  })
});

baseRoute.delete((req, res, next) => {
  Dishes.remove({}, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.end('Removed all dishes');
  })
});

itemRoute.get((req, res, next) => {
  Dishes.findById(req.params.dishId, (err, dish) => {
    if (err) {
      next(err);
      return;
    }

    res.json(dish);
  })
});

itemRoute.delete((req, res, next) => {
  Dishes.findByIdAndRemove(req.params.dishId, (err, resp) => {
    if (err) {
      next(err);
      return;
    }
    res.json(resp);
  })
});

export default dishRouter;


