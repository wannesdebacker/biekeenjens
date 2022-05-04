const Plyr = dynamic(() => import('plyr-react'), { ssr: false });
import 'plyr-react/dist/plyr.css';
import React from 'react';
import dynamic from 'next/dynamic';

import classNames from 'classnames';
import styles from './Video.module.scss';

const Video = ({ youtubeId, className }) => {
  const classes = classNames(styles['video-wrapper'], className);

  if (!youtubeId) {
    return null;
  }

  return (
    <div className={classes}>
      <Plyr
        source={{
          type: 'video',
          sources: [
            {
              src: youtubeId,
              provider: 'youtube',
            },
          ],
        }}
      />
    </div>
  );
};

export default Video;

export { Video };
