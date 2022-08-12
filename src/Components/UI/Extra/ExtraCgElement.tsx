import {useObject} from "@/hooks/useObject";
import styles from "@/Components/UI/Extra/extra.module.scss";
import React, {useCallback, useRef} from "react";
import {logger} from "@/Core/util/etc/logger";
import {PhotoProvider, PhotoView} from "react-photo-view";
import {IAppreciationAsset} from "@/interface/stateInterface/userDataInterface";

interface IProps {
  // IAppreciationAsset时存在
  name?: string;
  imgUrl?: string;
  // IAppreciationCgGroupAsset时存在
  series?: string;
  cgs?: Array<IAppreciationAsset>
  // 通用
  transformDeg: number;
  index: number;
  onclick: Function;
  isGroup: boolean;


}


export function ExtraCgElement(props: IProps) {
  logger.info('extraCgElement', props);
  const showFull = useObject(false);
  const handleClick = useCallback(() => {
    showFull.set(!showFull.value)
  }, [showFull]);
  const containerRef = useRef<any>();
  const handleShowFullContainer = useCallback((e) => {
    if (e.target === containerRef.current) {
      showFull.set(!showFull.value);
    } else {
      logger.info('无需处理');
    }
  }, [showFull])

  return <>
    {showFull.value && <div onClick={handleShowFullContainer} className={styles.showFullContainer} ref={containerRef}>
      {props.isGroup ?
        (<PhotoProvider>
          {props?.cgs?.map((item, index) => {
            return <PhotoView key={index} src={item.url}>
              {index < 1 ? (<div className={styles.showFullCgMain}>
                <div style={{
                  backgroundImage: `url('${props.imgUrl}')`,
                  backgroundSize: `cover`,
                  backgroundPosition: "center",
                  width: '100%',
                  height: '100%',
                }} />
              </div>) : undefined}
            </PhotoView>
          })}
      </PhotoProvider>) :  (<PhotoProvider>
        <PhotoView key={0} src={props.imgUrl}>
          <div className={styles.showFullCgMain}>
            <div style={{
              backgroundImage: `url('${props.imgUrl}')`,
              backgroundSize: `cover`,
              backgroundPosition: "center",
              width: '100%',
              height: '100%',
            }} />
          </div>
        </PhotoView>
      </PhotoProvider>)}

    </div>}
    <div onClick={handleClick} style={{
      // transform: `rotate(${deg}deg)`,
      animation: `cg_softIn_${props.transformDeg} 1.5s ease-out ${100 + props.index * 100}ms forwards `
    }} key={props.name} className={styles.cgElement}>
      <div style={{
        backgroundImage: `url('${props.imgUrl}')`,
        backgroundSize: `cover`,
        backgroundPosition: "center",
        width: '100%',
        height: '100%',
      }}/>
    </div>
  </>;
}
