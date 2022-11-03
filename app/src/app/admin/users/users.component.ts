

import { Component, OnInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponent } from '../../shared/common/common.component';
import { AuthService } from '../../@core/services/auth.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {

  dtElement: DataTableDirective;
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
    public user : UserService,
    public auth : AuthService,
    public ngbModal: NgbModal,


  ) {

   }

  ngOnInit() {
    this.data = [];

    this.getAllUsersInitially();



  }

  getAllUsersInitially() {

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


addUser(){

}

updateUser(){


}
deleteUser(){


}
changeStatus(person){

  console.log(person);


  const activeModal = this.ngbModal.open(CommonComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
  activeModal.componentInstance.username = person.username;
  activeModal.componentInstance.id = person.id;
  activeModal.componentInstance.frontEnddata = person;
  activeModal.componentInstance.model = 'user';
  activeModal.componentInstance.endpointType = 'put';
  activeModal.componentInstance.apiName = 'changeUserStatus';
  activeModal.componentInstance.headerTitle = 'Status Change';
  activeModal.componentInstance.bodyContent = 'Changing Status of';
  activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
     receivedEntry &&
     [this.auth.makeToast('success','Changing Status Success',`Status change ${person.username}`),
     this.rerender()]
  });
}


ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
  this.getUserSubscription.unsubscribe();
}


rerender(): void {

  this.user.getAllUsers().pipe(takeUntil(this.getUserSubscription)).subscribe((data: any) => {
    this.data = data.user;
   this.loading = false;
 });

  this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}


}

