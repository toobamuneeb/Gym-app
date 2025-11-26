import React, { useRef } from 'react';
import { Modal, View, Pressable, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const CustomFullScreenWebView = ({ uri, onClose }: any) => {
  return (
    <Modal visible animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>

      <WebView
        originWhitelist={['*']}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        source={{
          html: `
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body style="margin:0;background:black;">
                <video 
                  controls 
                  autoplay 
                  playsinline 
                  style="width:100%;height:100%;"
                >
                  <source src="${uri}" type="video/mp4" />
                </video>
              </body>
            </html>
          `,
        }}
        style={{ flex: 1 }}
      />
    </Modal>
  );
};

export default CustomFullScreenWebView;

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
  },
});
