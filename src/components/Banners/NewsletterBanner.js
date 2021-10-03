import classes from './NewsletterBanner.module.css';

const NewsletterBanner = () => {
  return (
    <section className={classes.newsletter}>
      <h4>-5%</h4>
      <h5>Join our community to receive a discount code. Stay up to date!</h5>
      <button>JOIN</button>
    </section>
  );
};

export default NewsletterBanner;
