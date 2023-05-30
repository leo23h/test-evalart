import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hasAdnMutant: boolean = false;
  stringAdn: string = '';
  StringAdnPerfect: boolean = true;
  matrizMainAdn: String[][] = [];
  message: string = '';

  validateAdn(stringAdn: string) {
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
        if (
          buildMatriz[i][j] !== 'A' &&
          buildMatriz[i][j] !== 'T' &&
          buildMatriz[i][j] !== 'C' &&
          buildMatriz[i][j] !== 'G'
        ) {
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
    // asignar a la variable principal
    this.matrizMainAdn = buildMatriz;
  }

  // funcion para validar que la matriz sea cuadrada
  isMatrizSquare(arrayAdn: String[][]): boolean {
    let lengthArrayAdn = arrayAdn.length;
    let cont = 0;
    for (let i = 0; i < arrayAdn.length; i++) {
      if (arrayAdn[i].length !== lengthArrayAdn) {
        cont++;
      }
    }

    return cont > 0 ? false : true;
  }

  isMutant() {
    let cont = 0;
    let contVert = 0;
    let contDiag = 0;
    this.hasAdnMutant = true;
    this.message = 'No-Mutante';
    for (let i = 0; i < this.matrizMainAdn.length; i++) {
      for (let j = 0; j < this.matrizMainAdn[0].length - 3; j++) {
        // horizontal
        if (
          this.matrizMainAdn[i][j] == this.matrizMainAdn[i][j + 1] &&
          this.matrizMainAdn[i][j] == this.matrizMainAdn[i][j + 2] &&
          this.matrizMainAdn[i][j] == this.matrizMainAdn[i][j + 3]
        ) {
          cont++;
          console.log('horizontal', cont);
          this.message = 'Mutante';
        }

        // vertical
        if (
          this.matrizMainAdn[j][i] == this.matrizMainAdn[j + 1][i] &&
          this.matrizMainAdn[j][i] == this.matrizMainAdn[j + 2][i] &&
          this.matrizMainAdn[j][i] == this.matrizMainAdn[j + 3][i]
        ) {
          contVert++;
          console.log('vertical', contVert);
          this.message = 'Mutante';
        }

         // diagonal
         if (
          this.matrizMainAdn[i][j] == this.matrizMainAdn[i + 1][j + 1] &&
          this.matrizMainAdn[i][j] == this.matrizMainAdn[i + 2][j + 2] &&
          this.matrizMainAdn[i][j] == this.matrizMainAdn[i + 3][j + 3]
        ) {
          contDiag++;
          console.log('diagonal', this.matrizMainAdn[i][j]);
          this.message = 'Mutante';
        }
      }
    }
  }
  
}


// ATGCGA,
// AAGTGC,
// ATACAT,
// TGAATG,
// CCCATA,
// TCACTG