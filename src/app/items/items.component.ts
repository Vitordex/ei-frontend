import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ItemService } from '../items-services/item.service';
import { Constants } from 'src/constants';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

interface Item {
  _id: string,
  name: string,
  price: number
}

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input('size-options') pageSizeOptions: number[] = [1, 5, 10, 25, 50];

  @Input('columns') displayedColumns = ['name', 'price', 'delete'];

  @Input('item-name') itemName: string;

  @ViewChild('inputCsv') inputCsv: ElementRef;

  public listSize: number;
  public pageSize: number = 10;
  public shownList: Item[];
  private itemsList: Item[];

  uploadMode = 'determinate';

  constructor(
    private service: ItemService,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  private getToken(): string {
    return sessionStorage.getItem(Constants.TOKEN_HEADER);
  }

  async ngOnInit() {
    await this.initializeItems();

    this.getItemsList(0, this.pageSize);
  }

  private async initializeItems() {
    const token = this.getToken();

    try {
      this.itemsList = await this.service.getItems(token, this.itemName);
      this.listSize = this.itemsList.length;
    } catch (error) {
      throw error;
    }
  }

  public async uploadFile(files: FileList) {
    this.uploadMode = 'indeterminate';

    let message: string = 'Arquivo enviado com sucesso';
    const action: string = 'OK';
    let config = new MatSnackBarConfig();
    config.panelClass = ['success'];

    const token = this.getToken();
    const fileToUpload = files.item(0);

    let success = true;

    try {
      await this.service.postFile(fileToUpload, token, this.itemName);
    } catch (error) {
      success = false;
      
      config.panelClass = ['fail']
      config.duration = 10000;
      
      switch (error.status) {
        case 401:
          message = 'Há um problema com seu token';
          this.authService.clearToken();
          this.router.navigate([Constants.ROUTES.LOGIN]);
          break;
        case 400:
          message = 'Há um problema com seu arquivo';
          break;
        case 500:
          message = 'Houve um erro interno, favor verifique o arquivo ou tente novamente';
          break;
        default:
          message = 'Houve um erro';
          break;
      }
    }

    this.snackBar.open(message, action, config);

    this.uploadMode = 'determinate';

    if (!success) return;

    await this.initializeItems();
  }

  private getItemsList(index, max) {
    const endList: number = (index + 1) * max;
    this.shownList = this.itemsList.slice(index, endList);
  }

  public openFileDialog(): void {
    let event = new MouseEvent('click', { bubbles: false });
    this.inputCsv.nativeElement.dispatchEvent(event);
  }

  public async onPage($event) {
    const size: number = $event.pageSize;
    const index: number = $event.pageIndex;

    await this.getItemsList(index * size, size);
  }

  public async deleteItem(itemId: string) {
    let message: string = `Item deletado com sucesso ${itemId}`;
    const action: string = 'OK';
    let config = new MatSnackBarConfig();
    config.panelClass = ['success'];

    const token = this.getToken();

    let success = true;

    try {
      await this.service.deleteItem(itemId, token, this.itemName);
    } catch (error) {
      success = false;

      config.panelClass = ['fail']
      config.duration = 10000;

      switch (error.status) {
        case 401:
          message = 'Há um problema com seu token';
          this.authService.clearToken();
          this.router.navigate([Constants.ROUTES.LOGIN]);
          break;
        case 400:
          message = 'Há um erro com o item';
          break;
        case 404:
          message = 'Item não encontrado';
          break;
        case 500:
          message = 'Houve um erro interno';
          break;
        default:
          message = 'Houve um erro';
          break;
      }
    }

    this.snackBar.open(message, action, config);

    if (!success) return;

    await this.initializeItems();
  }
}
