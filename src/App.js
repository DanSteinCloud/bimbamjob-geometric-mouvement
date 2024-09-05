import "./App.css";
import {useState, useEffect} from "react";
import Grille from "./components/Grille";
import FICHIER_DE_COMMANDE_TONDEUSE from "./datasource/fichier.txt";

export default function App() {
  const [order, setOrder] = useState([]);
  const [data, setData] = useState();
  const [isDeactivating, setIsDeactivating] = useState(false);
  const surface = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1 ,1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
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
    const newOrder = [...order, index];
    setOrder(newOrder);
    // deactivate
    if (newOrder.length === surface.flat(1).filter(Boolean).length) {
      tondreSurfaceParGrille();
    }
  };

  useEffect(() => {
    fetch(FICHIER_DE_COMMANDE_TONDEUSE)
      .then(function(response){
         return response.text();
      }).then(function (val) {
        setData(val);
        console.log(data);
      })
  });

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${surface[0].length}, 1fr)`,
        }}
      >
        {surface.flat(1).map((value, index) => {
          return value ? (
            <Grille
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              onClick={() => couvrirSurfaceDeVerdure(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span />
          );
        })}
      </div>
      <div>
      <p>Cliquer du bas vers le haut, de la gauche vers la droite, pour recouvrir la surface à tondre</p>
      <p>La tondeuse demarre une fois la dernièrre grille cevouverte</p>
      </div>
      
    </div>
  );
}