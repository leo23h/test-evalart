import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMutant!: boolean;
  stringAdn: string = "";
  StringAdnPerfect: boolean = true;

  validateAdn(stringAdn: string){
    let stringCutted = stringAdn.split(',');
    let buildMatriz = [];
    let hasCharactersRequired = true;
    let isSquare = true;
    let countCharactersDiferents = 0;
    // recorrer el array para armar la matriz con los valores
    for (let i = 0; i < stringCutted.length; i++) {
      let rowSplitted = stringCutted[i].split('');
      buildMatriz.push(rowSplitted);
    }

    // recorrer la matriz para validar que sus caracteres sean los requeridos (A,T,C,G)
    for (let i = 0; i < buildMatriz.length; i++) {
      for (let j = 0; j < buildMatriz[0].length; j++) {
        // verificar si la matriz contiene los caracteres requeridos
        if(buildMatriz[i][j] !== 'A' && buildMatriz[i][j] !== 'T' && buildMatriz[i][j] !== 'C' && buildMatriz[i][j] !== 'G'){
          countCharactersDiferents++;
        }
      }
    }

    // cumple con los caracteres requeridos
    hasCharactersRequired = countCharactersDiferents === 0 ? true : false;
    // cumple con la propiedad cuadrada de una matriz
    isSquare = this.isMatrizSquare(buildMatriz);
    // enviar a renderizar si la matriz es perfecta
    this.StringAdnPerfect = hasCharactersRequired && isSquare ? true : false;
  }

  // funcion para validar que la matriz sea cuadrada
  isMatrizSquare(arrayAdn: String[][]): boolean{
     let lengthArrayAdn = arrayAdn.length;
     let cont = 0;
     for (let i = 0; i < arrayAdn.length; i++) {
      if(arrayAdn[i].length !== lengthArrayAdn){
        cont++;
      }
    }

    return cont > 0 ? false : true;
  }



}
