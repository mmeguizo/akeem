import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../@core/services/auth.service';
import { UserService } from '../../@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from '../../@core/services/customer.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'ngx-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();
  private getSubscription = new Subject<void>();


  private userData :any;
  public buttonStatus : String = 'primary';
  public buttonTxt : String = 'action'
  public action : String = "action to perform in";
  public form: any;
  public showpassword: Boolean = false;
  public eyeIcon : String = 'eye-outline'


  constructor(

    public auth: AuthService,
    public user: UserService,
    public customer: CustomerService,
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,


  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }


  createForm() {
    this.form = this.formBuilder.group({
      username:         ['', [Validators.required]],
      email:     ['', [Validators.required]],
      password:     ['', [Validators.required]],
      role:     ['', [Validators.required]],
      confirm:     ['', [Validators.required]],
    })
  }

  closeModal() {
    this.activeModal.close();
  }

  showPassword(){
    if(this.showpassword == true){
      this.showpassword = false;
      this.eyeIcon = "eye-off-outline";
    }else{
      this.showpassword = true;
      this.eyeIcon = "eye-outline";
    }
  }


  executeAction(form){
    console.log(form.value)

  }

}
