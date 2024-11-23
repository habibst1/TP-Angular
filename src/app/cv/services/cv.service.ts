import { Injectable, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { map, Observable, shareReplay, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private cvs: Cv[] = [];
  /**
   * Le subject permettant de créer le flux des cvs sélectionnés
   */
  #selectCvSuject$ = new Subject<Cv>();
  /**
   * Le flux des cvs sélectionnés
   */
  selectCv$ = this.#selectCvSuject$.asObservable();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    this.cvs = [
      new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
      new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
    ];
  }

  /**
   *
   * Retourne un liste fictive de cvs
   *
   * @returns CV[]
   *
   */
  getFakeCvs(): Cv[] {
    return this.cvs;
  }

   /**
   *
   * Retourne la liste des cvs de l'API multicast
   *
   * @returns CV[]
   *
   */
   getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv).pipe(shareReplay(1));
  }
  /**
   *
   * Retourne la liste des cvs de juniors
   *
   * @returns CV[]
   *
   */
  getJuniors(): Observable<Cv[]> {
    return this.getCvs().pipe(map((cvs) => cvs.filter((cv) => cv.age < 40)));
  }
  /**
   *
   * Retourne la liste des cvs de seniors
   *
   * @returns CV[]
   *
   */
  getSeniors(): Observable<Cv[]> {
    return this.getCvs().pipe(map((cvs) => cvs.filter((cv) => cv.age >= 40)));
  }
  /**
   *
   * Retourne la liste des cvs contenant entered 'name'
   *
   * @returns CV[]
   *
   */
  searchCvs(name: string): Observable<any[]> {
    const filter = {
      where: {
        name: { like: `%${name}%` }, // SQL-like query to search for names containing the given text
      },
    };
    return this.http.get<any[]>(API.cv, { params: { filter: JSON.stringify(filter) } });
  }
  /**
   *
   * supprime un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  deleteCvById(id: number): Observable<any> {
    return this.http.delete<any>(API.cv + id);
  }

  addCv(cv: Cv): Observable<Cv> {
    return this.http.post<any>(API.cv, cv);
  }

  /**
   *
   * Retourne un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(API.cv + id);
  }

  /**
   *
   * Cherche un cv avec son id dans lai liste fictive de cvs
   *
   * @param id
   * @returns Cv | null
   */
  findCvById(id: number): Cv | null {
    return this.cvs.find((cv) => cv.id == id) ?? null;
  }

  /**
   *
   * Supprime un cv s'il le trouve
   *
   * @param cv : Cv
   * @returns boolean
   */
  deleteCv(cv: Cv): boolean {
    const index = this.cvs.indexOf(cv);
    if (index > -1) {
      this.cvs.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Recherche les cvs dont le name contient la chaine name passée en paramètre
   * @param name : string
   * @returns cvs Cv[]
   */
  selectByName(name: string) {
    const search = `{"where":{"name":{"like":"%${name}%"}}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<any>(API.cv, { params });
  }
  /**
   * Recherche les cvs dont la valeur est égale à la chaine passée en paramètre
   * @param property : string, la propriété sur laquelle on va requeter
   * @param value : string, la valeur de la propriété sur laquelle on va requeter
   * @returns cvs Cv[]
   */
  selectByProperty(property: string, value: string) {
    const search = `{"where":{"${property}":"${value}"}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Permet d'ajouter un cv au flux des cvs sélectionnés
   *
   * @param cv : Le cv à ajouter dans le flux des cvs sélectionnés
   */
  selectCv(cv: Cv) {
    this.#selectCvSuject$.next(cv);
  }
}
