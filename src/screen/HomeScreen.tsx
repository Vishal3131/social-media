import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MomentData {
  id: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  expanded: boolean;
}

const dummyMoments: MomentData[] = [
  {
    id: '1',
    date: 'July 12, 2025',
    location: 'Pune, Maharashtra',
    description:
      'You spent time outdoors — surrounded by trees, sunlight, and the quiet rhythm of the city.',
     images: [
         'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
         'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s',
          'https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg',
         'https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    ],
    expanded: false,
  },
  {
    id: '2',
    date: 'July 1, 2025',
    location: 'Mumbai, Maharashtra',
    description:
      'You spent time by the shore — embraced by salty breeze, golden sand, and the gentle heartbeat of the sea.',
     images: [
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
        'https://thumbs.dreamstime.com/b/simple-art-beach-pile-well-balanced-rocks-usable-backgrounds-balance-meditation-concepts-67111553.jpg',
       'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg'
    ],
    expanded: false,
  },
];

const HomeScreen = () => {
  const [moments, setMoments] = useState<MomentData[]>(dummyMoments);

  const handleToggle = (id: string) => {
    setMoments((prev) =>
      prev.map((moment) =>
        moment.id === id ? { ...moment, expanded: !moment.expanded } : moment
      )
    );
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Upload Failed', response.errorMessage || '');
        } else {
          Alert.alert('Upload Success', 'Image selected successfully!');
        }
      }
    );
  };

  const renderMoment = ({ item }: { item: MomentData }) => {
    const displayedImages = item.expanded ? item.images : item.images.slice(0, 6);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.date}>{item.date}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="location-sharp" color="red" size={14} />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
            
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.imageGrid}>
          {displayedImages.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image}    resizeMode="cover" onError={() => console.warn(`Image failed to load: ${uri}`)} />
          ))}
        </View>

        {item.images.length > 6 && (
          <TouchableOpacity onPress={() => handleToggle(item.id)}>
            <Text style={styles.moreText}>
              {item.expanded
                ? 'Show Less'
                : `${item.images.length - 6} More Moments`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>OkaBoka</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.avatar}
        />
      </View>

      {/* Mood Section */}
      <View style={styles.moodContainer}>
        <Text style={styles.moodTitle}>How I'm Feeling Right Now</Text>
        <View style={styles.moodEmojiRow}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
          <View style={styles.currentMood}>
            <Text style={{ fontSize: 32 }}>😔</Text>
            <Text style={styles.moodLabel}>Sad</Text>
            <Text style={styles.moodCount}>15k</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </View>
        <View style={styles.moodOptions}>
          {['😊 Happy', '😘 Romantic', '😐 Neutral', '🤩 Excited'].map((mood, i) => (
            <Text key={i} style={styles.moodOption}>{mood}</Text>
          ))}
        </View>
      </View>

      {/* Moments List */}
      <FlatList
        data={moments}
        renderItem={renderMoment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating + Button */}
      <TouchableOpacity style={styles.fab} onPress={handleImageUpload}>
        <Ionicons name="add" size={36} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>Oka (You)</Text>
        <Text style={styles.bottomText}>Bond</Text>
        <Text style={styles.bottomText}>Oka’s</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3EC7A9',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  moodContainer: {
    backgroundColor: '#3EC7A9',
    padding: 16,
    alignItems: 'center',
  },
  moodTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  moodEmojiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentMood: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  moodLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  moodCount: {
    fontSize: 12,
    color: '#444',
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '100%',
    paddingHorizontal: 20,
  },
  moodOption: {
    color: 'black',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 5,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 14,
    color:'black'
  },
  location: {
    marginLeft: 4,
    fontSize: 12,
    color: '#555',
  },
  description: {
    marginTop: 6,
    marginBottom: 8,
    fontSize: 13,
    color: '#333',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
image: {
  width: '30%',
  height: 100, 
  margin: 2,
  borderRadius: 8,
  backgroundColor: '#ccc', 
},
  moreText: {
    marginTop: 8,
    color: '#3EC7A9',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    left: '42%',
    backgroundColor: '#3EC7A9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  bottomBar: {
    backgroundColor: '#3EC7A9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 14,
  },
  bottomText: {
    color: 'black',
    fontWeight: '600',
  },
});
