import classes from './NewCollectionBanner.module.css';

const NewCollectionBanner = () => {
  return (
    <section className={classes.collection}>
      <div className={classes.image}>
        <div className={classes.shadow}>
          <h5>New Collection</h5>
          <button>SEE NOW</button>
        </div>
      </div>
    </section>
  );
};

export default NewCollectionBanner;
