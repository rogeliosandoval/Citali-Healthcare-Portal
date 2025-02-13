import { Component, OnInit, inject, signal } from '@angular/core'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { PrimeNGConfig } from 'primeng/api'
import { SharedService } from '../../services/shared.service'
import { PasswordModule } from 'primeng/password'
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { Footer } from '../../components/footer/footer.component'

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
  public sharedService = inject(SharedService)
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

  public sendResetLink(): void {
    this.sharedService.loading.set(true)

    setTimeout(() => {
      this.resetLinkSent.set(true)
      this.sharedService.loading.set(false)
    }, 1500)
  }
}