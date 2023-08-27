import css from './UserLogo.module.scss';

const UserLogo = () => {
  return (
    <button className={css.btn} type="button">
      <img src="" alt=""User icon height="44px" width="44px"/>
      <p className={css.text}>Alexey</p>
    </button>
  );
};

export default UserLogo;
