import Express from 'express';
import counter from './counter';

const router = Express.Router();

counter(router);

export default router;
