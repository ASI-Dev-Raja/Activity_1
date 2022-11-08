import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { CrudService } from "./crud.services";

import { ICrud } from './crud';

@Component({
  selector: 'pm-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  public pageTitle = 'CRUD';
  sub!: Subscription;
  crud: ICrud[] = [];
  input_name: string = 'test';
  input_email: string = 'test@test.com';
  input_id: number = 12;
  data:any
  
  
  errorMessage = '';

  constructor(private crudService: CrudService) {}

  create(input_name:string, input_email: string): void{
    this.crudService.createProduct(input_name,input_email).subscribe()
  }

  read(): void{
    this.sub = this.crudService.getProducts().subscribe({
      next: cruds => {
        this.crud = cruds;
      },
      error: err => this.errorMessage = err
    });
  }

  delete(input_id:number): void{
    this.crudService.deleteProduct(input_id).subscribe()
  }

  update(input_id:number,input_name:string,input_email:string): void{
    this.crudService.updateProduct(input_id,input_name,input_email).subscribe()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}