import ClothItem from './ClothItem/ClothItem';

import classes from './AvalibleClothes.module.css';

const AvalibleClothes = (props) => {
  return (
    <section className={classes['clothes-list']}>
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
    </section>
  );
};

export default AvalibleClothes;
