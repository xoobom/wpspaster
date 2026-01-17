/**
 * 替换富文本里src图片地址
 */
export function formatContentImages(content, newSrc) {
  const imgRegex = /(<img[^>]*src=["'])(\/wpspaster\/[^"']*)(["'][^>]*>)/gi;

  return content.replace(imgRegex, (match, beforeSrc, originalPath, afterSrc) => {
    if (originalPath.startsWith('/wpspaster/')) {
      return `${beforeSrc}${newSrc}${originalPath}${afterSrc}`;
    }
    return match;
  });
}
