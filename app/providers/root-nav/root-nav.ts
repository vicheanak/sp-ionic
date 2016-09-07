import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';

@Injectable()
export class RootNav {

  getRootNav(nav: NavController) : NavController{
      let root = nav;
      while(root.parent != null){
          root = root.parent;
      }
      return root;
  }

}


