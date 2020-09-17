import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  error;
  constructor(public userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }
  faCoffee = faAddressBook;
  creditCard = faCreditCard;
  university = faUniversity;
  signout = faSignOutAlt;
  location = faMapMarkedAlt;
  arrow = faArrowCircleDown;
  user = faUser;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
        this.error=err;
      }
    );
   
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  oncreateAccount(){
    this.router.navigate(['/createAccount']);
  }
  
  
}
