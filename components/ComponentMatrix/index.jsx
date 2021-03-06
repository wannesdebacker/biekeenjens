import Header from 'components/Header';
import TextBlock from 'components/TextBlock';
import VideoBlock from 'components/VideoBlock';
import React from 'react';
import MatrixComponent from 'components/MatrixComponent';
import styles from './ComponentMatrix.module.scss';
import CallToActionBlock from 'components/CallToActionBlock';
import GalleryBlock from 'components/GalleryBlock';
import CheckinBlock from 'components/CheckinBlock';
import PackageBlock from 'components/PackageBlock';

const ComponentMatrix = ({ blocks = [], packages = [] }) => {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className={styles['component-matrix']}>
      {blocks.map((block, index) => {
        if (block.__typename === 'HeaderRecord') {
          return (
            <MatrixComponent
              key={`${block.__typename}-${index}`}
              header={true}
              even={index % 2 === 0}
            >
              <Header
                title={block?.title}
                image={block?.image}
                logo={block?.logo}
                date={block?.datum}
                date2={block?.datum2}
                titleSub={block?.titleSub}
                links={block?.links}
                small={block?.small}
              />
            </MatrixComponent>
          );
        }
        if (block.__typename === 'TextRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`} even={index % 2 === 0}>
              <TextBlock
                title={block?.title}
                key={`${block.__typename}-${index}`}
                image={block?.image}
                floatImage={block?.floatImage}
                floatRight={block?.floatRight}
              >
                {block?.content}
              </TextBlock>
            </MatrixComponent>
          );
        }
        if (block.__typename === 'GallerijRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`} even={index % 2 === 0}>
              <GalleryBlock title={block?.title} text={block?.content} images={block?.images} />
            </MatrixComponent>
          );
        }
        if (block.__typename === 'CallToActionRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`} even={index % 2 === 0}>
              <CallToActionBlock title={block?.title} text={block?.content} links={block?.links} />
            </MatrixComponent>
          );
        }
        if (block.__typename === 'VideoRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`} even={index % 2 === 0}>
              <VideoBlock title={block?.title} text={block?.content} youtubeId={block?.youtubeId} />
            </MatrixComponent>
          );
        }
        if (block.__typename === 'CheckinRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`} even={index % 2 === 0}>
              <CheckinBlock
                title={block?.title}
                text={block?.content}
                succesMessage={block?.succesMessage}
              />
            </MatrixComponent>
          );
        }
        if (block.__typename === 'PackageBlockRecord') {
          return (
            <MatrixComponent key={`${block.__typename}-${index}`} even={index % 2 === 0}>
              <PackageBlock
                packages={packages}
                title={block?.title}
                text={block?.content}
                iban={block?.rekeningnummer}
                paymentInstructions={block?.paymentInstructions}
              />
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
