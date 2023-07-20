import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import PlaceholderImage from './assets/images/background-image.png'
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEMoji] = useState(null);

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
    setShowOptions(false)
    setSelectedImage(null)
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
        {pickedEmoji !== null ? 
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        : null}
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
      <StatusBar style="auto" />
    </View>
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
