

import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../@core/services/auth.service';
import { UserService } from '../../@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from '../../@core/services/customer.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'ngx-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();
  private getSubscription = new Subject<void>();


  private customerData :any;
  public buttonStatus : String = 'primary';
  public buttonTxt : String = 'Add'
  public action : String = "Adding";
  public form: any;
  public id : String;
  public updateCustomer : Boolean;
  selected : String;


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

    console.log(this.customerData.id)

    this.buttonTxt === 'update' ?  this.getCustomer(this.customerData.id ) : '';
  }


  createForm() {
    this.form = this.formBuilder.group({
      name:         ['', [Validators.required]],
      email:     ['', [Validators.required]],
      address:     ['', [Validators.required]],
      company:     ['', [Validators.required]],
      phone:     ['', [Validators.required]],
      notes:     ['', [Validators.required]],
      attachment:     ['', [Validators.required]],
      open_balance:     ['', [Validators.required]],
    })
  }

  closeModal() {
    this.activeModal.close();
  }


  getCustomer(id){

    console.log('getCustomer');

    console.log(this.customerData.endpoint);
    console.log(this.customerData.apiName);


    this.customer.getRoute(this.customerData.endpoint, this.customerData.apiName, { id : id }).pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
      this.form = this.formBuilder.group({
        name:         [data.data.name, [Validators.required]],
        email:     [data.data.email, [Validators.required]],
        address:     [data.data.address, [Validators.required]],
        company:     [data.data.company, [Validators.required]],
        phone:     [data.data.phone, [Validators.required]],
        notes:     [data.data.notes, [Validators.required]],
        attachment:     [data.data.attachment, [Validators.required]],
        open_balance:     [data.data.open_balance, [Validators.required]],
      })



      // data.success ? [this.passEntry.emit(data) , this.activeModal.close()] : this.passEntry.emit(data)
   });
  }

  executeAction(form){
    form.value.id = this.customerData?.id || 0;
    this.customer.getRoute(this.customerData?.endpoint2 ?? this.customerData.endpoint, this.customerData?.apiName2 ?? this.customerData.apiName, form.value).pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
      data.success ? [this.passEntry.emit(data) , this.activeModal.close()] : this.passEntry.emit(data)
   });
  }

  elEventListenerActive: boolean;
  openFile(ev, id){
    let file,
      el = document.getElementById(id);
      el.click();
    let handler = (fc) => {
      try{
        let fileList: any;
        let fd = new FormData();
            if(fc.target['files'][0]['name'] !== undefined){
              fileList = fc.target;
              let file: File = fileList.files[0];
                fd.append('files', file, file.name);


            }else{
              // this.Product.image = '';
              ev.target.innerHTML = 'Browse';
              this.elEventListenerActive = false;
              el.removeEventListener('change', handler);
            }
          }catch(e){
            // this.Product.image = '';
            ev.target.innerHTML = 'Browse';
            this.elEventListenerActive = false;
            el.removeEventListener('change', handler);
          }
        }
    if( !this.elEventListenerActive ){
      el.addEventListener('change', handler);
      this.elEventListenerActive = true;
    }
  }



}
