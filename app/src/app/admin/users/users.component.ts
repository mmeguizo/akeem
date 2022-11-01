

import { Component, OnInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  bsValue = new Date();
  filterQuery = '';
  sortBy = 'id';
  sortOrder = 'asc';
  selectQueryString = 'Last Name';
  selectQuery = 'lname';
  data;
  loading = true;
  date = new Date();
  todate;
  public socketInstance;
  me;

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;


  dataSource
  private getUserSubscription = new Subject<void>();
  constructor(
    public user : UserService

  ) {

   }

  ngOnInit() {
    this.data = [];

    this.getAllUsers();



  }

  getAllUsers() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.user.getAllUsers().pipe(takeUntil(this.getUserSubscription)).subscribe((data: any) => {
        this.data = data.user;
       this.loading = false;
      //  this.data = (data as any).data;
       // Calling the DT trigger to manually render the table
       this.dtTrigger.next();
     });

}

selectFilter(name, value){
  this.selectQuery = name;
  this.selectQueryString = value;
  this.popover.hide();
  setTimeout(() => this.nameField.nativeElement.focus(), 0);
  this.filterQuery = "";
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
  this.getUserSubscription.unsubscribe();
}


}

