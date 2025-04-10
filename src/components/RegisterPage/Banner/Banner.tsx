import { useMediaQuery } from '@mui/material';
import css from './Banner.module.css';

const Banner = () => {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1200px)');

  return (
    !isTablet && (
      <div className={css.container}>
        <picture className={css.picture}>
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/public/img/iPhone@1x-pc.webp 1x, /public/img/iPhone@2x-pc.webp 2x"
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/public/img/iPhone@1x-mobile.webp 1x, /public/img/iPhone@2x-mobile.webp 2x"
          />
          <img
            src="/public/img/iPhone@1x-mobile.png"
            alt="smartphone"
            className={css.image}
          />
        </picture>
      </div>
    )
  );
};

export default Banner;
