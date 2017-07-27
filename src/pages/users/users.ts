import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { Users } from '../../models/user';
import { UserDetailsPage} from '../user-details/user-details';

import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: Users[];

  searchTerm: string = '';
  searchControl: FormControl;

  constructor(public navCtrl: NavController, public params: NavParams, private githubUsers: GithubUsersProvider) {
    githubUsers.load().subscribe(users => {
      this.users = users;
    });

    this.searchControl = new FormControl();
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {
      login: login
    });
  }

  search(searchEvent, gitUsers: GithubUsersProvider) {
    this.searchTerm = searchEvent.target.value.trim();
    if(this.searchTerm) {
      this.searchControl.valueChanges.debounceTime(300).subscribe(() => {
        this.githubUsers.searchUsers(this.searchTerm).subscribe(users => {
          this.users = users;
        });
      });
    }
  }

}
