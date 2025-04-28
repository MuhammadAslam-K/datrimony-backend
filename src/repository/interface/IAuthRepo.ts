import { IUser } from "@/models/user";
import { BaseRepository } from "../base.repo";

export interface IAuthRepository extends BaseRepository<IUser> { }