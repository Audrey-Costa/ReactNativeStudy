import { StyleSheet, View } from 'react-native';
import PlaceholderImage from '../assets/images/background-image.png'
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react'
import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import EmojiPicker from '../components/EmojiPicker'
import EmojiList from '../components/EmojiList';
import EmojiSticker from '../components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from "expo-media-library";
import { captureRef } from 'react-native-view-shot';

export default function StickerSmach() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEMoji] = useState(null);
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if(status === null) {
      requestPermission();
  };

  const pickImageAsync = async () => {

    const picked = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    
    if (!picked.canceled) {
      setSelectedImage(picked.assets[0].uri);
      setShowOptions(true);
    } else {
      alert('You did not select any image.');
    };

  };

  const onReset = () => {
    setShowOptions(false);
    setSelectedImage(null);
    setPickedEMoji(null);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1
      });
      saver = await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        alert("Saved!")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji !== null ? 
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          : null}
        </View>
      </View>
      {showOptions ? (
        <View style={styles.optionsContainer}> 
          <View style={styles.optionRow}> 
            <IconButton icon='refresh' label='Reset' onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync}/>
          </View>
        </View>
      ):(
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
          <Button label="Use this photo" onPress={() => setShowOptions(true)}/>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEMoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
