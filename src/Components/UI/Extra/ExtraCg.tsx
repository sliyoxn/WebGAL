import styles from "@/Components/UI/Extra/extra.module.scss";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useObject} from "@/hooks/useObject";
import './extraCG_animation_List.scss';
import {ExtraCgElement} from "@/Components/UI/Extra/ExtraCgElement";
import {logger} from "@/Core/util/etc/logger";
import {IAppreciationAsset, IAppreciationCgGroupAsset} from "@/interface/stateInterface/userDataInterface";

export function ExtraCg() {
  const cgPerPage = 9;
  const es = useSelector((state: RootState) => state.userData.appreciationData);
  logger.info('qaq:', es);
  logger.info('qvq:', processCgData(es.cg));
  const renderCg = processCgData(es.cg);
  const pageNumber = Math.ceil(renderCg.length / cgPerPage);
  const currentPage = useObject(1);
  // const renderExtra
  // 开始生成立绘鉴赏的图片
  const showCgList = [];
  const len = renderCg.length;
  const handleClick = useCallback((qvq) => {
    logger.info('ExtraCg', qvq);
  }, []);
  for (let i = (currentPage.value - 1) * cgPerPage; i < Math.min(len, (currentPage.value - 1) * cgPerPage + cgPerPage); i++) {
    const index = i - (currentPage.value - 1) * cgPerPage;
    const deg = Random(-5, 5);
    const temp = (
      <ExtraCgElement transformDeg={deg}
                      index={index}
                      onclick={handleClick}
                      key={index.toString() + (renderCg[i].url || renderCg[i].poster)}
                      name={renderCg[i].name}
                      imgUrl={renderCg[i].url || renderCg[i].poster}
                      isGroup={!!renderCg[i].poster}
                      cgs={renderCg[i].cgs}
                      // series={}
                      />
    );
    showCgList.push(temp);
  }

  // 生成cg鉴赏的导航
  const showNav = [];
  for (let i = 1; i <= pageNumber; i++) {
    let className = styles.cgNav;
    if (currentPage.value === i) {
      className = className + ' ' + styles.cgNav_active;
    }
    const temp = <div onClick={() => currentPage.set(i)} key={'nav' + i} className={className}>
      {i}
    </div>;
    showNav.push(temp);
  }

  return <div className={styles.cgMain}>
    <div className={styles.cgContainer}>
      {showCgList}
    </div>
    <div className={styles.cgShowDiv}>
      {showNav}
    </div>
  </div>;
}

function Random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

function processCgData(data: Array<IAppreciationAsset>): Array<IAppreciationAsset | IAppreciationCgGroupAsset> {
  let newCgData: Array<any> = [];
  let map: Map<string, Array<IAppreciationAsset>> = new Map();
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (map.has(item.series)) {
      map.get(item.series)!.push(item);
    } else {
      map.set(item.series, [item]);
    }
    map.set(item.series, (map.get(item.series) || []));
  }
  // @todo key priority ranking
  for (const mapElement of map) {
    let [key, val] = mapElement;
    if (key === 'default') {
      newCgData.push(...val);
    } else if (key === '') {
       newCgData.push(...val);
    }else {
      newCgData.push({
        series: key,
        cgs: [...val],
        poster: val[0].url,
        name: val[0].name
      })
    }
  }
  return newCgData;
}
