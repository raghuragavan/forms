import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { usersServiceService } from '../service/usersService.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
user:any
id:any

  constructor(private usersService: usersServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['user_id']
    this.getSingleUser()
}


onbackclick(){
  this.router.navigate(['']);
}

getSingleUser(): void{   
  this.usersService.singleUser(this.id).subscribe((x:any) =>{
    this.user = x['data'];
    console.log(this.user);
  })
}

}

