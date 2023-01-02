


import { Component, OnInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { takeUntil } from 'rxjs/operators';
import { FileService } from '../../@core/services/file.service';
import { CommonComponent } from '../../shared/common/common.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../@core/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { log } from 'console';
import { UploadsComponent } from '../uploads/uploads.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

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
  id : String;

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;


  dataSource
  private getFileSubscription = new Subject<void>();
  constructor(
    public ngbModal: NgbModal,
    public auth : AuthService,
    public file : FileService,
    public activeModal: NgbActiveModal,


  ) {

   }

  ngOnInit() {

    console.log(this.id);
   this.getAllUsersFiles(this.id);

  }

  getAllUsersFiles(id = null) {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.file.getAllFiles(id).pipe(takeUntil(this.getFileSubscription)).subscribe((data: any) => {
      console.log('getAllFiles')
      console.table(data)

        this.data = data.data;
       this.loading = false;
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
  this.getFileSubscription.unsubscribe();
}




rerender(): void {

  this.file.getAllFiles(this.id).pipe(takeUntil(this.getFileSubscription)).subscribe((data: any) => {
    this.data = data.data;
   this.loading = false;
 });

  this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}



deleteCustomer(file){



  const activeModal = this.ngbModal.open(CommonComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
  activeModal.componentInstance.frontEnddata = {
    link : file,
 };
  activeModal.componentInstance.endpointType = 'put';
  activeModal.componentInstance.model = 'fileupload';
  activeModal.componentInstance.apiName = 'deleteFile';
  activeModal.componentInstance.headerTitle = 'Deleting File';
  activeModal.componentInstance.bodyContent = 'Are you sure you?';

  activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
    receivedEntry.success ?
    [this.auth.makeToast('success',`Deleting ${receivedEntry.data?.name || file.name}`,receivedEntry.message),
    this.rerender()] : [this.auth.makeToast('danger',`Deleting ${receivedEntry.data?.name || 'failed'}`,receivedEntry.message),
    this.rerender()]
  });

}
addFiles(){
  const activeModal = this.ngbModal.open(UploadsComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
  activeModal.componentInstance.id = this.id;
  activeModal.componentInstance.passEntry.subscribe((receivedEntry) =>

  {
    receivedEntry ?
    [this.auth.makeToast('success',`Adding file`,receivedEntry.message),
    this.rerender()] : [this.auth.makeToast('danger',`Adding file ${receivedEntry.data?.username || 'failed'}`,receivedEntry.message),
    this.rerender()]

  });

}
closeModal() {
  this.activeModal.close();
}


updateCustomer(){


}
// deleteCustomer(){


// }

}

