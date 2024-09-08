import {React, useState} from "react";
import FICHIER_DE_COMMANDE_TONDEUSE from "../datasource/fichier.txt";

export default function ExtraireLesLigneDeCommandes(){
      const [fichier, setFichier] = useState('');
      fetch(FICHIER_DE_COMMANDE_TONDEUSE)
      .then(function(response){
        return response.text();
      }).then(function (val) {
        setFichier(val);
        console.log("fichier lu :", fichier)
      })
      const [wordsPerLine, setWordsPerLine] = useState(0);
      const [lines, setLines] = useState([]);
      const [containerWidth, setContainerWidth]= useState(getWindowDimensions());

      function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
    
      const calculateWordsPerLine = () => {
        const words = fichier.split(" ");
        let lineCount = 0;
        let currentLine = "";
        const dummyElement = document.createElement("div");
  
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          currentLine += word + " ";
  
          if (dummyElement.scrollWidth > containerWidth) {
            // line exceeds the container width
            lineCount++;
            currentLine = word + " "; // reset the current line
          }
        }
  
        setWordsPerLine(lineCount);
        setLines(
          Array(lineCount)
            .fill("")
            .map((_, index) => (
              <div key={index} className="line">
                {lines[index].trim()}
              </div>
            ))
        );
      };
  
      calculateWordsPerLine();
      window.addEventListener("resize", calculateWordsPerLine);
      return () => lines
    };