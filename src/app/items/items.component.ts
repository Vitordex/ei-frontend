import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ItemService } from '../items-services/item.service';

interface Item {
  id: string,
  name: string,
  price: number
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input('size-options') pageSizeOptions: number[] = [1, 5, 10, 25, 50];
  
  @Input('columns') displayedColumns = ['name', 'price', 'delete'];

  @Input('item-name') itemName: string = 'materials';

  @ViewChild('inputCsv') inputCsv: ElementRef;

  public length: number;
  public itemsList: Item[];

  constructor(private service: ItemService) { }

  private getToken(){
    return sessionStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNzg2MmViZTkxMjQiLCJpYXQiOjE1NDc2ODE2NzYsImV4cCI6MTU0NzY4MTY3Niwic3ViIjoiYXV0aCJ9.3g66OdbK8vpaJqo5p9YdTaSCrjCxg-kO_-XP8sqQqXI';
  }

  async ngOnInit() {
    const token = this.getToken();
    
    try {
      this.itemsList = await this.service.getItems(token, this.itemName); 
    } catch (error) {
      throw error;
    }
  }

  private getItemsList() {

  }

  public openFileDialog(): void {
    let event = new MouseEvent('click', { bubbles: false });
    this.inputCsv.nativeElement.dispatchEvent(event);
  }

  public async deleteItem(itemId: string) {
    const token = this.getToken();

    try {
      await this.service.deleteItem(itemId, token, this.itemName);
    } catch (error) {
      throw error;
    }
  }
}
