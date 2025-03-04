import { Component, OnInit, inject, signal } from '@angular/core'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { MenuModule } from 'primeng/menu'
import { MenuItem } from 'primeng/api'
import { PrimeNGConfig } from 'primeng/api'
import { Router, RouterOutlet } from '@angular/router'
import { TooltipModule } from 'primeng/tooltip'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { AuthService } from '../../services/auth.service'
import { SharedService } from '../../services/shared.service'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { SidebarModule } from 'primeng/sidebar'
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'chp-dashboard',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MenuModule,
    RouterOutlet,
    TooltipModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    NgOptimizedImage
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class Dashboard implements OnInit {
  private firestore = inject(Firestore)
  private confirmationService = inject(ConfirmationService)
  private messageService = inject(MessageService)
  private router = inject(Router)
  public authService = inject(AuthService)
  public sharedService = inject(SharedService)
  public primengConfig = inject(PrimeNGConfig)
  public items: MenuItem[] | undefined
  public sidebarVisible = signal<boolean>(false)

  ngOnInit(): void {
    this.initializeApp()
    this.items = [
      {
        label: 'Inbox',
        icon: 'pi pi-inbox',
        command: () => {
          this.router.navigateByUrl('/dashboard/inbox')
        }
      },
      {
        label: 'Account Settings',
        icon: 'pi pi-cog',
        command: () => {
          this.router.navigateByUrl('/dashboard/account-settings')
        }
      },
      {
        label: 'Sign Off',
        icon: 'pi pi-sign-out',
        command: () => {
          this.signOff()
        }
      }
    ]
  }

  public async initializeApp(): Promise<void> {
    this.sharedService.loading.set(true)
    await this.authService.fetchCoreUserData()
    .then(() => {
      this.sharedService.loading.set(false)
    })
  }

  public async test(): Promise<void> {
    const dataRef = doc(this.firestore, `data/spinal cord injury`);
    const diseaseProcessCollection = collection(dataRef, 'disease process');
  
    // List of document names you want to create
    const documentNames = [
      'Spondylotic Myelopathy',
      'Brown-Sequard`s Paralysis',
      'Intervertebral disc disorder with myelopathy',
      'Diplegia',
      'Anterior or Posterior Cord Syndrome',
      'Conus Medullaris Syndrome',
      'Dislocations of cervical, lumbar, or vertebra with spinal cord involvement',
      'Intraspinal-Epidural Abscess',
      'Quadriplegia',
      'Paraplegia',
      'Diplegia'
    ];
  
    try {
      // Create an array of promises
      const createDocsPromises = documentNames.map(docName => {
        const subDocRef = doc(diseaseProcessCollection, docName);
        return setDoc(subDocRef, {}); // Create an empty document
      });
  
      // Execute all Firestore operations in parallel
      await Promise.all(createDocsPromises);
  
      console.log('All documents successfully created!');
    } catch (error) {
      console.error('Error creating documents:', error);
    }
  }  

  public signOff(): void {
    this.sharedService.loading.set(true)

    setTimeout(() => {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigateByUrl('/')
          this.sharedService.loading.set(false)
        }
      })
    }, 2000)
  }

  public confirmSignOff(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to sign out?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.signOff()
      },
      key: 'positionDialog'
    })
  }

  public grabRoute() {
    return this.router.url
  }
}