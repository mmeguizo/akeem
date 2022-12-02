

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../@core/services/auth.service';
import { UserService } from '../../@core/services/user.service';
import { FileService } from '../../@core/services/file.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { setTimeout } from 'timers';


@Component({
  selector: 'ngx-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {


  private getSubscription = new Subject<void>();


  public loading = true;
  public form: any;
  public data: any;
  public uid: any;
  public dataID: any;
  public showpassword = false;
  public eyeIcon = "eye-off-outline";
  public avatar: any;
  public role: any;


  private userData :any;
  public buttonStatus : String = 'primary';
  public buttonTxt : String = 'action'
  public action : String = "action to perform in";
  public id : String;
  selected : String;

  loadingMediumGroup = false;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public auth: AuthService,
    public user: UserService,
    public file: FileService
  ) {
    this.createForm();
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

  ngOnInit() {
    this.getUser();

  }

  getUser(){


  }

  updateUser(data){

  }

  showPassword(){
    if(this.showpassword == true){
      this.showpassword = false;
      this.eyeIcon = "fas fa-eye";
    }else{
      this.showpassword = true;
      this.eyeIcon = "fas fa-eye-slash";
    }
  }

  imageLoader = false;
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
                   fd.append('profile_picture', file, file.name);

                    this.loadingMediumGroup = true;
                    this.file.addFile(fd).pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
                    this.loadingMediumGroup = false;
                    console.log(data);
                   });


                  /*
var formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');
// Display the key/value pairs
for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
}

                  */




                  //   this.file.addFile(fd).pipe(takeUntil(this.getSubscription)).subscribe((data: any) => {
                  //   this.loadingMediumGroup = false;
                  //   console.log(data);
                  //  });

                  /*
                      this.sgs.request('post', 'xfile/avatars', fd, response => {
                        if(response.success){
                          this.elEventListenerActive = false;
                          this.avatar = response.data.name;
                          el.removeEventListener('change', handler);
                        }else{
                          // this.Product.image = '';
                          el.removeEventListener('change', handler);
                        }
                      });
                  */

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

  closeModal() {
    this.activeModal.close();
  }

  executeAction(form){

  }

}
