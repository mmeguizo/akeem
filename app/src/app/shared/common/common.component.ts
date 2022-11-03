

import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../@core/services/auth.service';
import { UserService } from '../../@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ngx-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit,OnDestroy {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();
  private getUserSubscription = new Subject<void>();


  public headerTitle;
  public bodyContent;

  public frontEnddata;
  public username;
  public anyVariable;

  public id;
  public data;
  public model;
  public apiName;
  public endpointType;


  constructor(

    public auth: AuthService,
    public user: UserService,
    public activeModal: NgbActiveModal,

  ) {

  }

  ngOnInit(): void {
  }


  runQuery(){

    if(this.model && this.model === 'user'){
        this.user.getRoute(this.endpointType,this.apiName,this.frontEnddata).pipe(takeUntil(this.getUserSubscription)).subscribe((data: any) => {
          this.passEntry.emit(data);
          this.activeModal.close();
       });
        if(this.endpointType === 'post'){

        }else if(this.endpointType === 'put'){

        }else{

        }
    }else{
      this.logout();
    }
  }


  closeModal() {
    this.activeModal.close();
  }

  logout(){
    this.auth.logout();
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.getUserSubscription.unsubscribe();
  }


}