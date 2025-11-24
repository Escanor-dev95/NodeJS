import User from "../models/userModel";

export async function getUsers(req : any, res: any) : Promise<any> {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export async function createUser(req:any, res:any) {
    try {
        const user = new User(req.body);   // crée l'objet
        await user.save();                 // l'enregistre en base
        res.status(201).json(user);        // renvoie au client
    } catch (err : any) {
        res.status(500).json({ error: err.message });
    }
}
