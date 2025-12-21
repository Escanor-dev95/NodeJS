import Role from '../models/roleModel';
import { RoleInterface, RoleName } from '../db/schemas';
import { CrudFactory } from '../utils/crudFactory';

const roleCRUD = new CrudFactory(Role);

export async function getRoles(req: any, res: any): Promise<RoleInterface[]> {
	return roleCRUD.getAll(req, res);
}

export async function getRole(req: any, res: any): Promise<RoleInterface> {
	return roleCRUD.getOne(req, res);
}

export async function createRole(req: any, res: any): Promise<void> {
	if (!Object.values(RoleName).includes(req.body.name)) {
		return res.status(400).json({ message: 'Invalid role name.' });
	}
	return roleCRUD.create(req, res);
}

export async function updateRole(req: any, res: any): Promise<void> {
	if (!Object.values(RoleName).includes(req.body.name)) {
		return res.status(400).json({ message: 'Invalid role name.' });
	}
	return roleCRUD.update(req, res);
}

export async function deleteRole(req: any, res: any) {
	return roleCRUD.delete(req, res);
}
