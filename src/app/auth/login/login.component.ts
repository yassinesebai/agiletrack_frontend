import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  invalid_credentials: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  get username() { return this.myForm.get('username'); }
  get password() { return this.myForm.get('password'); }

  login() {
    if (this.myForm.valid) {
      this.authService.login(this.myForm.value).subscribe({
        next: (data) => {
          this.showToast("success", "Logged in !", data.username + " is logged in successfully")
          this.invalid_credentials = false;
        },
        error: (e) => this.invalid_credentials = true
      })
    }
  }

  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }
  

}
