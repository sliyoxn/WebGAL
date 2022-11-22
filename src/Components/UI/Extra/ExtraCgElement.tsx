import { useValue } from '@/hooks/useValue';
import styles from '@/Components/UI/Extra/extra.module.scss';
import React, { useEffect, useMemo } from "react";
import { FULL_IMAGE_INFO, RUNTIME_GAME_INFO } from "@/Core/runtime/etc";

interface IProps {
  name: string;
  imgUrl: string;
  transformDeg: number;
  index: number;
}

const ExtraCgElement = React.memo(function ExtraCgElement(props: IProps) {
  const showFull = useValue(false);
  const setShowFull = function(value: boolean) {
    FULL_IMAGE_INFO.fullImageModelUpdater = value ? setShowFull : undefined;
    FULL_IMAGE_INFO.isInFullImageModel = value;
    showFull.set(value);
  };
  // 卸载组件时 重新标记为false
  useEffect(() => {
    return () => {
      FULL_IMAGE_INFO.isInFullImageModel = false;
    }
  }, [])
  return (
    <>
      {showFull.value && (
        <div onClick={(event) => {
          event.stopPropagation();
          setShowFull(!showFull.value);
        }} onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }} className={styles.showFullContainer}>
          <div className={styles.showFullCgMain}>
            <div
              style={{
                backgroundImage: `url('${props.imgUrl}')`,
                backgroundSize: `cover`,
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      )}
      <div
        onClick={(event) => {
          setShowFull(!showFull.value)
        }}
        style={{
          // transform: `rotate(${deg}deg)`,
          animation: `cg_softIn_${props.transformDeg} 1.5s ease-out ${100 + props.index * 100}ms forwards `,
        }}
        key={props.name}
        className={styles.cgElement}
      >
        <div
          style={{
            backgroundImage: `url('${props.imgUrl}')`,
            backgroundSize: `cover`,
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </>
  );
});

export {ExtraCgElement}

