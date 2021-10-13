import classes from './InformationBanner.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InformationBanner = (props) => {
  return (
    <section className={classes.information}>
      <div className={classes.container}>
        <div className={classes.column}>
          <FontAwesomeIcon icon="shield-alt" className={classes.icon} />
          <h5>SAFE SHOPPING</h5>
          <p>
            When you buy in our store, you are guaranteed safe purchases and
            payments
          </p>
        </div>
        <div className={classes.column}>
          <FontAwesomeIcon icon="shipping-fast" className={classes.icon} />
          <h5>FAST SHIPPING</h5>
          <p>We guarantee quick shipping</p>
        </div>
        <div className={classes.column}>
          <FontAwesomeIcon icon="money-bill" className={classes.icon} />
          <h5>BEST PRICES</h5>
          <p>Great poducts at the best prices</p>
        </div>
      </div>
    </section>
  );
};

export default InformationBanner;

// {
/* <FontAwesomeIcon icon="star" className={classes.star} />  */
// }
// {
/* <FontAwesomeIcon icon={['far', 'star']} className={classes.star} /> */
// }
