import localforage from 'localforage';
import React, { useEffect, useRef, useState } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { readBase64AsObjectUrl } from 'src/utils/image';

interface ImageViewerProps {
  uuids: string[];
  gallerDefaultUuid: string;
  onCancel: () => void;
}

const ImageViewer = ({ uuids, gallerDefaultUuid, onCancel }: ImageViewerProps) => {
  const [state, setState] = useState<{
    items: ReactImageGalleryItem[];
    startIndex: number;
  }>({
    items: [],
    startIndex: 0,
  });

  const ref = useRef<ImageGallery | null>(null);

  useEffect(() => {
    let urls: string[] = [];
    Promise.all<{ imageBase64: string } | null>(
      uuids.map((uuid) => {
        return localforage.getItem(uuid);
      })
    ).then((res) => {
      urls = res
        .filter((item) => item != null)
        .map((item) => {
          return readBase64AsObjectUrl((item as { imageBase64: string }).imageBase64);
        });
      setState({
        items: urls.map((url) => {
          return {
            original: url,
            thumbnail: url,
          };
        }),
        startIndex: uuids.indexOf(gallerDefaultUuid),
      });
    });

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [uuids, gallerDefaultUuid]);

  useEffect(() => {
    if (ref.current) {
      ref.current.fullScreen();
    }
  }, []);

  return (
    <ImageGallery
      onScreenChange={(boo) => {
        if (!boo) {
          onCancel();
        }
      }}
      showPlayButton={false}
      ref={ref}
      startIndex={state.startIndex}
      items={state.items}
    />
  );
};

export default ImageViewer;
