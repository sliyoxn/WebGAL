import styles from './textbox.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PERFORM_CONFIG } from '@/Core/config/performConfig';

export const TextBox = () => {
  const stageState = useSelector((state: RootState) => state.stage);
  const userDataState = useSelector((state: RootState) => state.userData);
  useEffect(() => {});
  const textDelay = PERFORM_CONFIG.textInitialDelay - 20 * userDataState.optionData.textSpeed;
  const size = userDataState.optionData.textSize * 50 + 200 + '%';

  // 拆字
  const textArray: Array<string> = stageState.showText.split('');
  const textElementList = textArray.map((e, index) => {
    let delay = index * textDelay;
    let prevLength = stageState.currentConcatDialogPrev.length;
    if (stageState.currentConcatDialogPrev !== '' && index >= prevLength) {
      delay = delay - prevLength * textDelay;
    }
    if (index < prevLength) {
      return (
        <span
          data-text={e}
          id={`${delay}`}
          className={styles.TextBox_textElement_Settled}
          key={stageState.currentDialogKey + index}
          style={{ animationDelay: `${delay}ms` }}
        >
          {e}
        </span>
      );
    }
    return (
      <span
        data-text={e}
        id={`${delay}`}
        className={styles.TextBox_textElement_start}
        key={stageState.currentDialogKey + index}
        style={{ animationDelay: `${delay}ms` }}
      >
        {e}
      </span>
    );
  });
  return (
    <div id="textBoxMain" className={styles.TextBox_main}>
      <div id="miniAvatar" className={styles.miniAvatarContainer}>
        {stageState.miniAvatar !== '' && (
          <img className={styles.miniAvatarImg} alt="miniAvatar" src={stageState.miniAvatar} />
        )}
      </div>
      {stageState.showName !== '' && (
        <div className={styles.TextBox_showName} style={{ fontSize: '200%' }}>
          {stageState.showName}
        </div>
      )}
      <div style={{ fontSize: size, wordBreak: 'break-word' }}>{textElementList}</div>
    </div>
  );
};
