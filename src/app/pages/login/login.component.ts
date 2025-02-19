import { Component, OnInit, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { PrimeNGConfig } from 'primeng/api'
import { SharedService } from '../../services/shared.service'
import { PasswordModule } from 'primeng/password'
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { Footer } from '../../components/footer/footer.component'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'chp-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    Footer
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class Login implements OnInit {
  public authService = inject(AuthService)
  public sharedService = inject(SharedService)
  private router = inject(Router)
  public primengConfig = inject(PrimeNGConfig)
  public forgotPassword = signal<boolean>(false)
  public resetLinkSent = signal<boolean>(false)
  public errorMessage = signal<string>('')
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    checked: new FormControl('')
  })
  public resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  })

  ngOnInit(): void {
    this.primengConfig.ripple = true
  }

  public login(): void {
    const formData = this.loginForm.value
    this.sharedService.loading.set(true)

    setTimeout(() => {
      if (formData.checked?.includes('yes')) {
        this.authService.loginWithLocalPersistence(formData.email!, formData.password!).subscribe({
          next: () => {
            this.sharedService.loading.set(false)
          },
          error: err => {
            if (err.message == 'Firebase: Error (auth/invalid-credential).') {
              this.errorMessage.set('Wrong email or password. Please try again.')
            } else {
              this.errorMessage.set(err.message)
            }
            this.sharedService.loading.set(false)
          },
          complete: () => {
            this.router.navigateByUrl('/dashboard')
          }
        })
      } else {
        this.authService.loginWithSessionPersistence(formData.email!, formData.password!).subscribe({
          next: () => {
            this.sharedService.loading.set(false)
          },
          error: err => {
            if (err.message == 'Firebase: Error (auth/invalid-credential).') {
              this.errorMessage.set('Wrong email or password. Please try again.')
            } else {
              this.errorMessage.set(err.message)
            }
            this.sharedService.loading.set(false)
          },
          complete: () => {
            this.router.navigateByUrl('/dashboard')
          }
        })
      }
    }, 2000)
  }

  public sendResetLink(): void {
    this.sharedService.loading.set(true)

    setTimeout(() => {
      this.resetLinkSent.set(true)
      this.sharedService.loading.set(false)
    }, 1500)
  }
}