import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';
import { ProductApiResponse } from './dto/product-api-response.dto';
import { switchMap, scan } from 'rxjs/operators';
import { CONSTANTES } from 'src/config/const.config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  private loadMoreSubject = new BehaviorSubject<void>(undefined);
  private skip = 0;
  limit = CONSTANTES.PRODUCT_LIMIT;
  public products$!: Observable<Product[]>;
  public loading = false;
  totalProducts = 0;
  maxProducts = CONSTANTES.MAX_PRODUCTS;

  constructor(private productService: ProductService) {
    this.products$ = this.loadMoreSubject.pipe(
      switchMap(() => this.fetchProducts()),
      scan<Product[], Product[]>((acc, curr) => [...acc, ...curr], [])
    );
  }

  private fetchProducts(): Observable<Product[]> {
    const settings: Settings = { limit: this.limit, skip: this.skip };

    if (this.totalProducts >= this.maxProducts) {
      return of([]);
    }

    this.loading = true;

    return this.productService.getProducts(settings).pipe(
      switchMap((response: ProductApiResponse) => {
        const remainingProducts = this.maxProducts - this.totalProducts;
        const productsToAdd = response.products.slice(0, remainingProducts);
        this.totalProducts += productsToAdd.length;
        this.skip += productsToAdd.length;
        this.loading = false;
        return of(productsToAdd);
      })
    );
  }

  loadMore() {
    if (!this.loading && this.totalProducts < this.maxProducts) {
      this.loadMoreSubject.next();
    }
  }

  get hasMoreProducts(): boolean {
    return this.totalProducts < this.maxProducts && !this.loading;
  }
}
