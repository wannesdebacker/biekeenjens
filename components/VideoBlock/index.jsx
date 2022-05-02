import React from 'react';
import Video from 'components/Video';

import styles from './VideoBlock.module.scss';
import classNames from 'classnames';
import Title from 'components/Title';
import Text from 'components/Text';

const VideoBlock = ({ title, text, youtubeId, className }) => {
  const classes = classNames(styles['video-block'], className);
  return (
    <div className={classes}>
      <div className={styles['video-block__text']}>
        {!!title && (
          <Title variant="h2" modLarge>
            {title}
          </Title>
        )}
        {!!text && <Text modWysiwyg>{text}</Text>}
      </div>
      {!!youtubeId && <Video youtubeId={youtubeId} />}
    </div>
  );
};

export default VideoBlock;

export { VideoBlock };
