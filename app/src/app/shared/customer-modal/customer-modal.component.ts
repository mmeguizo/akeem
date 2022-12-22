

import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../@core/services/auth.service';
import { UserService } from '../../@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerService } from '../../@core/services/customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileService } from '../../@core/services/file.service';
import { log } from 'console';



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
  files: any;
  myFiles: any;
  myNewFiles =  [];


  constructor(

    public auth: AuthService,
    public user: UserService,
    public fileService: FileService,
    public customer: CustomerService,
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,


  ) {
    this.createForm();
   }

  ngOnInit(): void {
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

      console.log(fc.target.files);

      for  (var index =  0; index <  fc.target.files.length; index++)  {
          this.myNewFiles.push(fc.target.files[index])
      }
      console.log({newFilesLength :this.myNewFiles.length});

      for (let i = 0; i < this.myNewFiles.length; i++) {
        console.log({"this.myNewFiles[i].name": this.myNewFiles[i].name});
      fd.append('files[]', this.myNewFiles[i], this.myNewFiles[i].name);
      }

      this.fileService.addFile(fd).pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
        console.log(data);
        this.elEventListenerActive = false;
        el.removeEventListener('change', handler);
     });

            // if(fc.target['files'][0]['name'] !== undefined){
            //   fileList = fc.target;
            //   let file: File = fileList.files;
            //   console.log(file)
            //   console.log(fileList.files.length)

            //     for (let i = 0; i <fileList.files.length; i++) {
            //       console.log(fileList.file[i])
            //       console.log(fileList.file.name[i])
            //       fd.append('files', file[i], file.name[i]);
            //     }
            //     console.log(fd.getAll('files'));
            // }else{
            //   // this.Product.image = '';
            //   ev.target.innerHTML = 'Browse';
            //   this.elEventListenerActive = false;
            //   el.removeEventListener('change', handler);
            // }

          }catch(e){
            // this.Product.image = '';
            console.log(e);
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
