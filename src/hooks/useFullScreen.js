import { useCallback, useEffect, useMemo, useState } from 'react';
import screenfull from 'screenfull';

const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fullscreenEnabled = useMemo(() => {
    return screenfull.isEnabled;
  }, []);

  const handleRequestFullScreen = useCallback(async () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }, []);

  const handleExitFullScreen = useCallback(async () => {
    screenfull.exit();
  }, []);

  useEffect(() => {
    const cb = () => {
      setIsFullScreen(screenfull.isFullscreen);
    };
    cb();
    screenfull.on('change', cb);
    return () => {
      screenfull.off('change', cb);
    };
  }, []);

  // https://stackoverflow.com/questions/34422052/how-to-detect-browser-has-gone-to-full-screen/34422551
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'F11') {
        e.preventDefault();
        screenfull.toggle();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return {
    fullscreenEnabled,
    isFullScreen,
    handleRequestFullScreen,
    handleExitFullScreen,
  };
};

export default useFullScreen;
