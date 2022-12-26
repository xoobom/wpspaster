import defaultSettings from '@/settings';

const title = defaultSettings.title || 'wpspaster-vue2-demo';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
