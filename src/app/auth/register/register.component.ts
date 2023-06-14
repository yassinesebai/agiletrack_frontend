import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        username: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        group: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        password2: new FormControl("", [Validators.required]),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('password2');
  
    if (password && confirmPassword && confirmPassword.value.length > 0 && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }
  
  get username() {
    return this.myForm.get("username");
  }
  get group() {
    return this.myForm.get("group");
  }
  get password() {
    return this.myForm.get("password");
  }
  get password2() {
    return this.myForm.get("password2");
  }
  get email() {
    return this.myForm.get("email");
  }

  register() {
    this.isSubmitted = true;
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.authService.register(this.myForm.value).subscribe({
        next: (data) => {
          alert("user registered successfully ! ");
        },
        error: () => alert("Invalid data !"),
      });
    }
  }
}
