import dynamic from 'next/dynamic';

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });
import 'plyr-react/dist/plyr.css';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Video.module.scss';
import { ErrorBoundary } from 'react-error-boundary';

const Video = ({ youtubeId, className }) => {
  const classes = classNames(styles['video-wrapper'], className);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 2000);
  }, [showVideo]);

  if (!showVideo) {
    return null;
  }

  if (!youtubeId) {
    return <div></div>;
  }

  return (
    <div className={classes}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </div>
  );
};

export default Video;

export { Video };
