/**
 * 其他运行时临时变量
 */

export const RUNTIME_GAME_INFO = {
  gameName: '',
  gameKey: '',
  prevBgm: '',

};

// 标记是否打开图片预览
export const FULL_IMAGE_INFO: {
  isInFullImageModel: boolean,
  fullImageModelUpdater ?: Function;
} = {
  isInFullImageModel: false,
  fullImageModelUpdater: undefined,
}

// export const RUNTIME_ETC = {
//   // 剩余的预加载场景数
//   currentPreloadRemainingSceneCount: 2,
// };

export const RUNTIME_SETTLED_SCENES: Array<string> = [];
export const RUNTIME_SETTLED_ASSETS: Array<string> = [];
