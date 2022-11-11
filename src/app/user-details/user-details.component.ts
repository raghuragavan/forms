import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl, FormArray} from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { usersServiceService } from '../service/usersService.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  newForm: FormGroup | any;
  value: any;
  user_details: any;
  users: any;

  



  // options = [
  //   {name:'apple', value:'Apple', checked:true},
  //   {name:'orange', value:'Orange', checked:false},
  //   {name:'mango', value:'Mango', checked:true}
  // ]
 
  
  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private matdialog: MatDialog,
              public usersService: usersServiceService) {}

  ngOnInit(): void {
    this.Users();

    this.newForm = this.fb.group({
      EmailId: [
        '',Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      firstname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
        ]),
      ],
      phone_number: [''],
      country: [''],
      sports:[''],
      Fruits:new FormArray([]),
    });
    this.addItem()
  }

  createItem(): FormGroup {
    return this.fb.group({
      apple:[false],
      orange:[false],
      mango:[false],
      grapes:[false]
    });
    
  }
  addItem(): void {
    let fruits = this.newForm.get('Fruits') as FormArray;
    fruits.push(this.createItem());
    // console.log(fruits);
    
  }
  // get selectedOptions() {
  //   return this.options
  //             .filter(opt => opt.checked)
  //             .map(opt => opt.value)
  // }

  // get result() {
  //   return this.list.filter((item: { checked: any; }) => item.checked);
  // }

  Users(): void {
    this.usersService.getUsers().subscribe((x: any) => {
      this.users = x['data'];
      console.log(this.users);
    });
  }

  newSubmit(value: any, valid:any) {
    if (valid) {
      let body = {
        firstname: value.firstname,
        emailId: value.emailId,
      };
      
    let formObj:any ={
      "user_details":[]
    }
    Object.entries(value).forEach(([key, value]) => {
      formObj.user_details.push({
        field_name: key, field_value: value
      });
    });
    console.log(formObj);    
  }


}
}
