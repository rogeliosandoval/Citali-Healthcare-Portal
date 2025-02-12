import { Component, OnInit, inject, signal } from '@angular/core'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { PrimeNGConfig } from 'primeng/api'
import { SharedService } from '../../services/shared.service'
import { PasswordModule } from 'primeng/password'
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'chd-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class Login implements OnInit {
  public sharedService = inject(SharedService)
  public primengConfig = inject(PrimeNGConfig)
  public errorMessage = signal<string>('')
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    checked: new FormControl('')
  })

  ngOnInit(): void {
    this.primengConfig.ripple = true
  }
}