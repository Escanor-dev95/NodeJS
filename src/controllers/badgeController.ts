import { CrudFactory } from '../utils/crudFactory';
import { BadgeInterface } from '../db/schemas';
import Badge from '../models/badgeModel';

const badgeCRUD = new CrudFactory(Badge);

export async function getBadges(req: any, res: any): Promise<BadgeInterface[]> {
	return badgeCRUD.getAll(req, res);
}

export async function getBadge(req: any, res: any): Promise<BadgeInterface> {
	return badgeCRUD.getOne(req, res);
}

export async function createBadge(req: any, res: any): Promise<BadgeInterface> {
	return badgeCRUD.create(req, res);
}

export async function updateBadge(req: any, res: any): Promise<BadgeInterface> {
	return badgeCRUD.update(req, res);
}

export async function deleteBadge(req: any, res: any) : Promise<BadgeInterface> {
	return badgeCRUD.delete(req, res);
}
