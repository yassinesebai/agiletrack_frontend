import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/services/auth.service';
import { Job } from '../models/Job.model';
import { EmployeeService } from '../services/employee.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myForm: FormGroup;
  isSubmitted: boolean;
  jobs: Job[];
  imageSelected: boolean = false;
  user_id: number;
  user: any;
  user_image: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastrService: NbToastrService, private employeeService: EmployeeService, private jobService: JobService) { }

  ngOnInit(): void {
    //initializing the reactive form
    this.myForm = this.fb.group(
      {
        password: new FormControl(""),
        password2: new FormControl(""),
        first_name: new FormControl("", [Validators.required]),
        last_name: new FormControl("", [Validators.required]),
        job: new FormControl("", [Validators.required])
      },
      { validator: this.passwordMatchValidator }
    );
    this.get_current_user(false);
    this.get_jobs();
  }

  get first_name() {
    return this.myForm.get("first_name");
  }
  get last_name() {
    return this.myForm.get("last_name");
  }
  get job() {
    return this.myForm.get("job");
  }
  get password() {
    return this.myForm.get("password");
  }
  get password2() {
    return this.myForm.get("password2");
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('password2');

    if (password && confirmPassword && confirmPassword.value.length > 0 && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  get_jobs(): void {
    this.jobService.get_jobs().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (e) => console.error(e)
    });
  }

  patch_form(): void {
    console.log(this.user)
    this.myForm.controls.first_name.setValue(this.user.first_name);
    this.myForm.controls.last_name.setValue(this.user.last_name);
    this.myForm.controls.job.setValue('' + this.user.job);
  }

  get_current_user(update: boolean): void {
    this.authService.user.subscribe((user) => {
      this.user_id = user.id;
    });
    this.employeeService.get_employee_byId(this.user_id).subscribe({
      next: (data) => {
        this.user = data;
        this.patch_form();
        if (update) {
          const updated= {...this.authService.userValue, image: this.user.image}
          console.log(updated)
          this.authService.userValue = updated;
        }
      },
      error: (e) => console.error(e)
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      this.imageSelected = true;
      this.user_image = event.target.files[0];
    }
  }

  update_profile_image(): any {
    const formData = new FormData();
    formData.append('image', this.user_image);
    this.employeeService.update_profile_image(this.user_id, formData).subscribe({
      next: (data) => {
        console.log(data);
        this.get_current_user(true);
      },
      error: (error) => console.error(error)
    })
  }

  update_profile(): any {
    this.isSubmitted = true;
    if (this.myForm.valid) {
      const post_values = {
        id: this.user_id,
        ...this.user,
        ...this.myForm.value
      };

      this.employeeService.update_profile(post_values).subscribe(
        (data) => {
          this.showToast("success", "updated !", "Profile updated successfully");
          this.get_current_user(false);
        },
        (error) => console.error(error)
      )
    }
    if (this.imageSelected) {
      this.update_profile_image();
      this.imageSelected = false;
    }
    this.myForm.controls.password.setValue('');
    this.myForm.controls.password2.setValue('');
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
