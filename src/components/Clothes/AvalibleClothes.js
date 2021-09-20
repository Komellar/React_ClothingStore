import ClothItem from './ClothItem/ClothItem';

import './AvalibleClothes.css';

const AvalibleClothes = (props) => {
  return (
    <ul className="meals-list">
      {props.clothes.map((cloth) => {
        return (
          <ClothItem
            key={cloth.id}
            id={cloth.id}
            name={cloth.title}
            desc={cloth.description}
            price={cloth.price}
            image={cloth.image}
          />
        );
      })}
    </ul>
  );
};

export default AvalibleClothes;
