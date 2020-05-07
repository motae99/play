import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en';
import fr from './locales/fr';
import ar from './locales/ar';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

/* -> [
  { countryCode: "GB", languageTag: "en-GB", languageCode: "en", isRTL: false },
  { countryCode: "US", languageTag: "en-US", languageCode: "en", isRTL: false },
  { countryCode: "FR", languageTag: "fr-FR", languageCode: "fr", isRTL: false },
] */

I18n.fallbacks = true;
I18n.translations = {
  en,
  fr,
  ar,
};

export default I18n;

//LiveChat

// <!-- Start of LiveChat (www.livechatinc.com) code -->
// <script type="text/javascript">
//   window.__lc = window.__lc || {};
//   window.__lc.license = 11907216;
//   (function() {
//     var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
//     lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
//     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
//   })();
// </script>
// <noscript>
// <a href="https://www.livechatinc.com/chat-with/11907216/" rel="nofollow">Chat with us</a>,
// powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>
// </noscript>
// <!-- End of LiveChat code -->
