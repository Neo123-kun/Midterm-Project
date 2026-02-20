import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 8,
  },

  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
