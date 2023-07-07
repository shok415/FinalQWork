import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  sideitems: MenuItem[] = [];
  sideMenuVisible: any
  @Input() menuType: any;
  ngOnInit(): void {
  this.sideitems = [
    {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
    },
    {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash'
    }
];
}

// ngOnChanges(ev: SimpleChanges): void {
//   this.sideMenuVisible = this.menuType
//   console.log("typeMenu",this.sideMenuVisible)
//   let elem = document.getElementById('sideMenu');
//   if (this.sideMenuVisible==false && elem){
//     elem.classList.add("hide")
//   }else if(this.sideMenuVisible==true && elem){
//     elem.classList.remove("hide")
//   }
// }


}
