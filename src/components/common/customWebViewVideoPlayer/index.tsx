import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export default function FullscreenVideoWebView({ uri }) {
  const webViewRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shouldPauseAfterExit, setShouldPauseAfterExit] = useState(false);

  const injectedBefore = `
    (function(){
      window.pauseFromNative = function() {
        const v = document.querySelector('video');
        if (v) v.pause();
      };

      const v = document.querySelector('video');
      if (v) {
        v.addEventListener('play', () => {
          if (v.requestFullscreen) v.requestFullscreen();
          if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
        });
      }
    })();
    true;
  `;

  const html = `
    <html>
      <body style="margin:0;background:black;">
        <video
          controls
          playsinline
          webkit-playsinline
          webkitAllowFullscreen
          allowfullscreen
          style="width:100%;height:100%;"
        >
          <source src="${uri}" type="video/mp4" />
        </video>
      </body>
    </html>
  `;

  const pauseVideo = () => {
    webViewRef.current?.injectJavaScript(`
      window.pauseFromNative && window.pauseFromNative();
      true;
    `);
  };

  return (
    <View style={{ height: 200, width: '100%' }}>
      <WebView
        ref={webViewRef}
        source={{ html }}
        javaScriptEnabled
        injectedJavaScriptBeforeContentLoaded={injectedBefore}
        allowsFullscreenVideo
        onShowCustomView={view => {
          setIsFullscreen(true);
        }}
        onHideCustomView={() => {
          // Mark that we SHOULD pause AFTER WebView reattaches visually
          setShouldPauseAfterExit(true);
          setIsFullscreen(false);
        }}
        onLayout={() => {
          // After fullscreen exit, WebView becomes visible again
          if (shouldPauseAfterExit && !isFullscreen) {
            pauseVideo();
            setShouldPauseAfterExit(false);
          }
        }}
        mixedContentMode="always"
        allowFileAccess
      />
    </View>
  );
}
