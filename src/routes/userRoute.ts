import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, getUser, hideUser, getActiveUser } from '../controllers';
import { authorizeRoles } from '../utils';

const router = express.Router();

// Lecture publique
router.get('/', getUsers);
router.get('/active', authorizeRoles(['admin']), getActiveUser);
router.get('/:id', authorizeRoles(['admin']), getUser);
// Creation d'utilisateur (inscription) publique
router.post('/', createUser);
// Modification réservéea l'admin et au propriétaire du compte
router.put('/:id', authorizeRoles(['admin']), updateUser);
router.patch('/hide/:id', authorizeRoles(['admin', 'owner']), hideUser);
// Seuls les admins peuvent supprimer un utilisateur
router.delete('/:id', authorizeRoles(['admin']), deleteUser);

export default router;
