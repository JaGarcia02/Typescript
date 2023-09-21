import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/user.types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { id: 1, name: 'John Garcia', email: 'ja02@email.com' },
    { id: 2, name: 'Robin Santos', email: 'r.santos@email.com' },
    { id: 3, name: 'Kiel Cereno', email: 'k.cereno@email.com' },
    { id: 4, name: 'Lucky Aquino', email: 'lucky69aquino@emial.com' },
    { id: 5, name: 'Melvin Santos', email: 'm.santos@email.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  addNewUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }

  fetchUserById(id: number) {
    return { id, name: 'John Garcia', email: 'ja02@email.com' };
    // return null;
  }
}
