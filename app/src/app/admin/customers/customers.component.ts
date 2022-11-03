


import { Component, OnInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from '../../@core/services/customer.service';



@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {


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
    public customer : CustomerService

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
    this.customer.getAllCustomers().pipe(takeUntil(this.getUserSubscription)).subscribe((data: any) => {
        this.data = data.costumer;
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

