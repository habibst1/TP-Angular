import { Component, computed, effect, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
  encapsulation: ViewEncapsulation.ShadowDom // Ensures styles are scoped to this component
})
export class TtcComponent {

  quantite=signal(1);
  tva=signal(18);
  prix=signal(0)
  private logEffect = effect(
    ()=> {console.log (`the current tva is ${this.tva()}`)}
  )

  prixTTC=computed(
    ()=> { return (((+this.prix())+(+this.tva()))*(1-this.discount())).toFixed(2)  ;}
  )
  discount=computed(
    ()=> { const q = this.quantite();
       if(q<10) return 0;
      else {

     
      if (( q >= 10) && ( q<15))
        return (0.8) ;
      else return 0.7;
    }
    }
  )
  discountOnTot=computed(
    ()=> { return ((+this.discount())*(+this.prixTotTTC())).toFixed(2);
    }
    
  )
  prixTotTTC=computed( ()=> {
    return ((+this.prixTTC())*(+this.quantite())).toFixed(2); }
  )
}