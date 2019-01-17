import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ItemService } from '../items-services/item.service';
import { Constants } from 'src/constants';

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
    return sessionStorage.getItem(Constants.TOKEN_HEADER);
  }

  async ngOnInit() {
    const token = this.getToken();
    
    try {
      this.itemsList = await this.service.getItems(token, this.itemName); 
      console.log(this.itemsList);
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
