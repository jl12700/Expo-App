import React, { useState, createContext, useContext } from 'react';
import { View, Text, Image, FlatList, Switch, TouchableOpacity, StyleSheet, Linking, Modal } from 'react-native';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}, // Default function
});

const projects = [
  { id: '1', name: 'Todo App', description: 'A simple task manager built with React.' },
  { id: '2', name: 'Calculator App', description: 'A simple calculator app with basic arithmetic operations.' },
  { id: '3', name: 'MHUB Equipment Reservation System', description: 'Online equipment reservation for MHUB.' },
];

const skills = ['C++', 'React', 'Node.js', 'Python', 'HTML/CSS'];

const Portfolio = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Modal state for profile picture
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle email click
  const handleEmailPress = () => {
    Linking.openURL('mailto:veneracionjohnlloyd@gmail.com');
  };

  // Function to handle GitHub click
  const handleGitHubPress = () => {
    Linking.openURL('https://github.com/jl12700');
  };

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={require('./assets/ID.png')} style={styles.profilePic} />
        </TouchableOpacity>
        <Text style={styles.name}>John Lloyd M. Veneracion</Text>
        <Text style={styles.bio}>C3A || Computer Science Student</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {skills.map((skill) => (
          <Text key={skill} style={styles.skill}>
            {skill}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.projectItem}>
              <Text style={styles.projectName}>{item.name}</Text>
              <Text style={styles.projectDesc}>{item.description}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Email:</Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.contactLink}>veneracionjohnlloyd@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>GitHub:</Text>
          <TouchableOpacity onPress={handleGitHubPress}>
            <Text style={styles.contactLink}>https://github.com/jl12700</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal to show the image */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal}>
              <Image source={require('./assets/ID.png')} style={styles.modalImage} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Portfolio />
    </ThemeContext.Provider>
  );
};

const baseStyles = {
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skill: {
    fontSize: 16,
    marginBottom: 5,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectDesc: {
    fontSize: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactLabel: {
    fontSize: 16,
    marginRight: 5,
  },
  contactLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 95,
  },
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  container: { ...baseStyles.container, backgroundColor: 'white' },
  name: { ...baseStyles.name, color: 'black' },
  bio: { ...baseStyles.bio, color: 'black' },
  sectionTitle: { ...baseStyles.sectionTitle, color: 'black' },
  skill: { ...baseStyles.skill, color: 'black' },
  projectName: { ...baseStyles.projectName, color: 'black' },
  projectDesc: { ...baseStyles.projectDesc, color: 'gray' },
  contactLabel: { ...baseStyles.contactLabel, color: 'black' },
  contactLink: { ...baseStyles.contactLink, color: 'blue' },
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  container: { ...baseStyles.container, backgroundColor: '#121212' },
  name: { ...baseStyles.name, color: 'white' },
  bio: { ...baseStyles.bio, color: 'white' },
  sectionTitle: { ...baseStyles.sectionTitle, color: 'white' },
  skill: { ...baseStyles.skill, color: 'white' },
  projectName: { ...baseStyles.projectName, color: 'white' },
  projectDesc: { ...baseStyles.projectDesc, color: 'gray' },
  contactLabel: { ...baseStyles.contactLabel, color: 'white' },
  contactLink: { ...baseStyles.contactLink, color: 'lightblue' },
});

export default App;