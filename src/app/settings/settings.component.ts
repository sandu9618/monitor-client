import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../servicecs/user-service/user-service.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  userNotifiers: string[] = [];

  settingsForm = this.formBuilder.group({
    emailCheck: false,
    voiceCheck: false,
    smsCheck: false
  });

  constructor(private userService: UserServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserNotificationTypes().subscribe(
      data => {
        this.userNotifiers = data.body;

        if (this.userNotifiers.includes('SMS')){
          this.settingsForm.controls.smsCheck.setValue(true);
        }

        if (this.userNotifiers.includes('VOICE_CALL')){
          this.settingsForm.controls.voiceCheck.setValue(true);
        }

        if (this.userNotifiers.includes('EMAIL')){
          this.settingsForm.controls.emailCheck.setValue(true);
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  update(){
    let notifers = [];
    if (this.settingsForm.value.smsCheck){
      notifers.push('SMS');
    }

    if (this.settingsForm.value.voiceCheck){
      notifers.push('VOICE_CALL');
    }

    if (this.settingsForm.value.emailCheck){
      notifers.push('EMAIL');
    }

    this.userService.updateUserNotificationTypes(notifers).subscribe(
      data => {
        console.log(data.status);
        if(data.status){
          Swal.fire({
            icon: 'success',
            text: 'Updating Success'
          });
        }

      },
      error => {
        console.log(error);
      }
    );
  }


}
