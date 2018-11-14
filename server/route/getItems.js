import express from 'express';
import {fetchLuandryItems} from '../Controller'

let router = express.Router();

router.get('/', fetchLuandryItems);

export default router;