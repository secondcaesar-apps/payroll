import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  NavCreateRole(){
    this.router.navigate(['/main/settings/roles-create'])
  }
}
