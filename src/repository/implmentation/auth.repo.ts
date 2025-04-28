import { BaseRepository } from "../base.repo";
import { IAuthRepository } from "../interface/IAuthRepo";
import { IUser, UserModel } from "@models/user";

export class AuthRepository extends BaseRepository<IUser> implements IAuthRepository {
    constructor() {
        super(UserModel);
    }
}