import { UserDetailsComponent } from './../user-details/user-details.component';
import { startWith, map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { usersServiceService } from '../service/usersService.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  users4: any;
  users: any;
  Length: any;
  totalPage: any;
  page: number = 1;
  count: number = 0;
  tablesizes: any = [6, 12];
  users2: any;
  pageNo: number = 2;
  showButtonOne: boolean = true;
  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'avatar',
    'edit',
    'delete',
  ];
  single: any;
  id: any;
  router: any;
  user: any;
  users3: any;

  constructor(
    public usersService: usersServiceService,
    private matdialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserPageTwo();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((x: any) => {
      this.users = x['data'];
      this.dataSource.data = this.users;
      console.log(this.users);
    });
  }

  getUserPageTwo(): void {
    this.usersService.getUsers2().subscribe((y: any) => {
      this.users2 = y['data'];
      console.log(this.users2);
    });
  }

  onCreate(user?: any) {
    const dialogRef = this.matdialog.open(newform, {
      width: '380px',
      height: '450px',
      data: { user_detail: user },
      disableClose: true,
    });
  }

  onDelete(id: any) {
    const dialogRef = this.matdialog.open(deletemethod, {
      disableClose: true,
      width: '400px',
      height: '150px',
      data: id,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getUsers();
      }
    });
  }

  newForm() {
    this.matdialog.open(UserDetailsComponent, {
      disableClose: true,
      width: '380px',
      height: '500px',
      data: {},
    });
  }
}

//////////////////////////////////////////////////////////////// newform ts

@Component({
  selector: 'newform',
  templateUrl: './newform.html',
  styleUrls: ['./list.component.scss'],
})
export class newform implements OnInit {
  myForm: FormGroup | any;
  auto: any;
  result: any;
  createResource: any;
  dataSource = new MatTableDataSource();
  listuser: any;
  filteredOptions: BehaviorSubject<any> = new BehaviorSubject(undefined);
  options: any;
  userlist: any = [];
  emailId: any;
  value: any;
  closeModalEvent: any;
  disabled: boolean = false;
  hide: boolean = false;
  // obser: any;
  getAllUserList: any = [];
  emailclose = 'clear Me';
  ngclose = 'clearme';
  emailSelect: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public userservice: usersServiceService,
    public dialogRef: MatDialogRef<newform>,
    @Inject(MAT_DIALOG_DATA) public data1: any
  ) {}

  ngOnInit(): void {
    this.getUse();
    this.getAllUserLIST();

    this.myForm = this.fb.group({
      emailId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$]*'),
        ]),
      ],
      firstname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
        ]),
      ],
      lastname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
        ]),
      ],
    });

    if (this.data1.user_detail?.id) {
      this.setFormValue();
    }
  }

  setFormValue() {
    let email = {
      email: this.data1.user_detail.email,
    };
    this.myForm.get('emailId').setValue(email);
    this.myForm.get('firstname').setValue(this.data1.user_detail.first_name);
    this.myForm.get('lastname').setValue(this.data1.user_detail.last_name);
  }

  get formControl() {
    return this.myForm.controls;
  }

  getUse() {
    this.userservice.getUsers().subscribe((response: any) => {
      this.userlist = response['data'];
    });
  }
  getAllUserLIST() {
    this.userservice.getUsers().subscribe(
      (res: any) => {
        this.getAllUserList = res['data'];

        this.myForm.get('emailId').valueChanges.subscribe((data: any) => {
          if (typeof data === 'string') {
            this.filterEmail(data);
          }
        });
        this.filterEmail('');
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
  filterEmail(_input: any) {
    const filterValue = _input.toLowerCase();
    let data1 = this.getAllUserList.filter((ele: any) =>
      ele.email.toLowerCase().includes(filterValue)
    );
    data1 = data1.length ? data1 : [{ email: 'Email not found in list' }];
    return this.filteredOptions.next(data1);
  }

  dispEmail() {
    return (val: any) => this.formatEmail(val);
  }
  formatEmail(_val: any): any {
    if (_val) return `${_val?.email}`;
  }

  onSubmit(valid: any, value: any): void {
    if (valid) {
      let body = {
        firstname: value.firstname,
        lastname: value.lastname,
        emailId: value.emailId,
      };
      this.disabled = true;
      if (this.data1?.user_detail?.id) {
        this.userservice.update(body).subscribe((response) => {
          this.dialog.open(popupbox, {
            disableClose: true,
            width: '400px',
            height: '250px',
            data: { data: value, update_detail: this.data1.user_detail },
          });
          this.dialogRef.close();
        });
      } else {
        this.userservice.createcontact(body).subscribe((response) => {
          this.dialog.open(popupbox, {
            disableClose: true,
            width: '400px',
            height: '250px',
            data: value,
          }),
            this.dialogRef.close();
        });
      }
    }
  }
}

///////////////////////////////////////////////////////////popupbox ts

@Component({
  selector: 'popupbox',
  templateUrl: './popupbox.html',
  styleUrls: ['./list.component.scss'],
})
export class popupbox implements OnInit {
  constructor(
    public usersService: usersServiceService,
    public dialogRef: MatDialogRef<popupbox>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}

//////////////////////////////////////////////////////////////Deletemethod ts

@Component({
  selector: 'deletemethod',
  templateUrl: './deletemethod.html',
  styleUrls: ['./list.component.scss'],
})
export class deletemethod implements OnInit {
  id: any;
  disabled = false;

  constructor(
    public usersService: usersServiceService,
    private matdialog: MatDialog,
    private fb: FormBuilder,

    private Http: HttpClientModule,
    public dialogRef: MatDialogRef<deletemethod>,
    @Inject(MAT_DIALOG_DATA) public deletedata: any
  ) {}

  ngOnInit(): void {}

  delete() {
    this.disabled = true;
    this.usersService.delete(this.deletedata).subscribe((d: any) => {
      this.matdialog.open(deletepopup, {
        disableClose: true,
        width: '400px',
        height: '150px',
      });
      this.dialogRef.close(true);
    });
  }
}

/////////////////////////////Deletepopus ts

@Component({
  selector: 'deletepopup',
  templateUrl: './deletepopup.html',
  styleUrls: ['./list.component.scss'],
})
export class deletepopup implements OnInit {
  constructor(
    public usersService: usersServiceService,
    public dialogRef: MatDialogRef<deletepopup>
  ) {}

  ngOnInit(): void {}
}
