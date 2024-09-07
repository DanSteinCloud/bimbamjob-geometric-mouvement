import "./App.css";
import {useState, useEffect, useRef} from "react";
import GrilleReverdie from "./components/GrilleReverdie";
import GrilleTondue from "./components/GrilleTondue";
import FICHIER_DE_COMMANDE_TONDEUSE from "./datasource/fichier.txt";
import ExtraireLesLigneDeCommandes from "./helper/ExtraireLesLigneDeCommandes";

export default function App() {
  const position = useRef(null);
  const currentIndex = useRef(100);
  const [order, setOrder] = useState([]);

  const [showCoordinate, setShowCoordinate] = useState(false);
  const [newIndex, setNewIndex] = useState();
  const [data, setData] = useState();
  const [isDeactivating, setIsDeactivating] = useState(false);
  const surface = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 1, 1],
  ];

  const cheminDelaPremiereTondeuse = [5, 10, 15, 20, 25, 30, 20, 15, 10, 5]

  const coordinates = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5],
  ];
  
  const tondreSurfaceParGrille = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  const couvrirSurfaceDeVerdure = (index) => {
    setNewIndex(index);
    const newOrder = [...order, index];
    setOrder(newOrder);
    position.current = affectCoordinates(index);
    console.log(position.current)
    setShowCoordinate(true);
    // deactivate
    if (newOrder.length === surface.flat().filter(Boolean).length) {
      tondreSurfaceParGrille();   
    }  
  };
  
  const affectCoordinates = (index) => {
    switch(index) {
      case 0:
        return [0, 5];
      case 1:
        return [1, 5];
      case 2:
        return [2, 5];
      case 3:
        return [3, 5];
      case 4:
        return [4, 5];
      case 5:
        return [5, 5];

      case 6:
        return [0, 4];
      case 7:
        return [1, 4];
      case 8:
        return [2, 4];
      case 9:
        return [3, 4];
      case 10:
        return [4, 4];
      case 11:
        return [5, 4];

      case 12:
        return [0, 3];
      case 13:
        return [1, 3];
      case 14:
        return [2, 3];
      case 15:
        return [3, 3];
      case 16:
        return [4, 3];
      case 17:
        return [5, 3];

      case 18:
        return [0, 2];
      case 19:
        return [1, 2];
      case 20:
        return [2, 2];
      case 21:
        return [3, 2];
      case 22:
        return [4, 2];
      case 23:
        return [5, 2];

      case 24:
        return [0, 1];
      case 25:
        return [1, 1];
      case 26:
        return [2, 1];
      case 27:
        return [3, 1];
      case 28:
        return [4, 1];
      case 29:
        return [5, 1];

      case 30:
        return [0, 0];
      case 31:
        return [1, 0];
      case 32:
        return [2, 0];
      case 33:
        return [3, 0];
      case 34:
        return [4, 0];
      case 35:
        return [5, 0];
      default:
        return [0, 0];
    }
  }


  useEffect(() => {

    currentIndex.current = 0;

    fetch(FICHIER_DE_COMMANDE_TONDEUSE)
      .then(function(response){
         return response.text();
      }).then(function (val) {
        setData(val);
      })
  });

  useEffect(() => {
    position.current = affectCoordinates(newIndex);
  }, [newIndex]);
  
  const [canShow , setCanShow] = useState(false)
  useEffect(() => {
    const timer = setTimeout( () => setCanShow(true) , 2000)
    return () => clearTimeout(timer); 
  }, []);
  
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${surface[0].length}, 1fr)`,
        }}
      >
        {surface.flat().map((value, index) => {
          return (value && canShow &&  cheminDelaPremiereTondeuse.includes(index)) ? (
            <GrilleTondue
              key={index}
              label={`cell cell-activated`}
              filled={order.includes(index)}
              onClick={() => {couvrirSurfaceDeVerdure(index)}}
              coordinate={position.current}
              showCoordinate={showCoordinate}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <GrilleReverdie
              key={index}
              label={`cell`}
              filled={order.includes(index)}
              onClick={() => {couvrirSurfaceDeVerdure(index)}}
              coordinate={position.current}
              showCoordinate={showCoordinate}
              isDisabled={order.includes(index) || isDeactivating}  
            />
          );
        })}
      </div>
      <div>
      <p>Cliquer du bas vers le haut, de la gauche vers la droite, pour recouvrir la surface à tondre</p>
      <p>La tondeuse demarre une fois la dernièrre grille recouverte</p>
      </div>
      
    </div>
  );
}