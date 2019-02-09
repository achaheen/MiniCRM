import {User} from './user';

export interface UserHolder {
  user?: User;
  password?: string;
  selectedGroups?: number[];
  selectedRoles?: number[];
}
