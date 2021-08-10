import { Router } from 'express';
import {
  addPlayerToTeam,
  createTeam,
  getTeam,
  getTeams,
  removePlayerFromTeam,
  removeTeam,
} from '../controllers/team.controller';

const router = Router();

router.get('/', getTeams);
router.get('/:id', getTeam);
router.delete('/:id', removeTeam);
router.post('/create', createTeam);
router.post('/:teamId/addPlayer/:playerId', addPlayerToTeam);
router.delete('/:teamId/addPlayer/:playerId', removePlayerFromTeam);

export default router;
