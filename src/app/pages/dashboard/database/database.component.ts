import { Component, OnInit } from '@angular/core'
import { TableModule } from 'primeng/table'

@Component({
  selector: 'chp-database',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})

export class Database implements OnInit {
  public products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '2000',
      code: 'f2G9ff0f2',
      name: 'Pink Blanket',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Clothing',
      quantity: 4,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }
  ]

  ngOnInit(): void {
      
  }
}