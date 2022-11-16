

import { throwError } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerService } from '../../@core/services/customer.service';
import { log } from 'console';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public totalUsers
    public loadingStorages = false;
    public storages = [];
    date;
    hours: string;
    minutes: string;
    seconds: string;
    PmAmTime: string;
    public timerId = null;
    attendance: any;
    employees: any;
    onDuty = 0;
    leaves = 0;
    loans = 0;
    PmAm = 0;
    userData
    customerData
    private getSubscription = new Subject<void>();

  constructor(
    public user : UserService,
    public customer : CustomerService
  ) {

    this.date = new Date();
    this.setCurrentTime();
    this.timerId = this.updateTime();

   }

  ngOnInit(): void {
      this.getAllUsers();
      this.getAllCustomer();
  }
  private updateTime() {
    setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }

  private setCurrentTime() {
    const time = new Date(Date.now());
    this.hours = this.leftPadZero((time.getHours() + 24) % 12 || 12);
    this.PmAmTime = this.leftPadZero(time.getHours());
    this.minutes = this.leftPadZero(time.getMinutes());
    this.seconds = this.leftPadZero(time.getSeconds());
    this.PmAm = parseInt(this.PmAmTime);
  }

  private leftPadZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }


  getAllUsers() {
    this.user.getAllUsers().pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
     this.userData = data.user.length;
  });

}
  getAllCustomer() {
    this.customer.getAllCustomers().pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
      console.log('getAllCustomer');
      console.log(data);

     this.customerData = data.customer.length;
  });

}


ngOnDestroy(){
  this.getSubscription.unsubscribe()
}

}

