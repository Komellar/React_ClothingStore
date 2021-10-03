import classes from './Banner.modal.css';

const Banner = (props) => {
  return <section className={classes.banner}>{props.children}</section>;
};

export default Banner;
