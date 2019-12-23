import {UserProfile} from './UserProfile';
import {Role} from './Role';
import {Board} from './Board';

export class User {
  public id: number;
  public email: string;
  public password: string;
  public profile: UserProfile;
  public roles: Role[];
  public boards: Board[];

  constructor(id?: number) {
    this.id = id;
  }
}
