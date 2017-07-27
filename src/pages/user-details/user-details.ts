import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { Users } from '../../models/user';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})

export class UserDetailsPage {

  login: string;
  user: Users;

  constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsers: GithubUsersProvider) {
    this.login = navParams.get('login');

    githubUsers.loadDetails(this.login).subscribe(user => {
      this.user = user;
    })
  }

}
