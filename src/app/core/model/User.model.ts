import {Interest} from './Interest.model';

export class UserModel {
  id: number;
  userId: number;
  email: string;
  gender: string;
  dob: string;
  info: string;
  firstName: string;
  lastName: string;
  location: string;
  token: string;
  userInterests: Interest[];
}
