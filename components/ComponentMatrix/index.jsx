import Header from 'components/Header';
import TextBlock from 'components/TextBlock';
import VideoBlock from 'components/VideoBlock';
import React from 'react';
import MatrixComponent from 'components/MatrixComponent';
import styles from './ComponentMatrix.module.scss';

const ComponentMatrix = ({ blocks = [] }) => {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className={styles['component-matrix']}>
      {blocks.map((block, index) => {
        if (block.__typename === 'HeaderRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`}>
              <Header title={block?.title} date={block?.datum} />
            </MatrixComponent>
          );
        }
        if (block.__typename === 'TextRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`}>
              <TextBlock
                title={block?.title}
                key={`${block.__typename}-${index}`}
                image={block?.image}
                floatImage={block?.floatImage}
                floatRight={block?.floatRight}
              >
                {block?.text}
              </TextBlock>
            </MatrixComponent>
          );
        }
        if (block.__typename === 'GallerijRecord') {
          // return <Gallerij key={index} {...block} />;
          return null;
        }
        if (block.__typename === 'CallToActionRecord') {
          // return <CallToAction key={index} {...block} />;
          return null;
        }
        if (block.__typename === 'VideoRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`}>
              <VideoBlock title={block?.title} text={block?.text} youtubeId={block?.youtubeId} />
            </MatrixComponent>
          );
        }
        return <div key={`notfound--${index}`}></div>;
      })}
    </div>
  );
};

export default ComponentMatrix;

export { ComponentMatrix };
