import { View, Text, FlatList } from 'react-native';
import { useJobs } from '../context/JobsContext';
import { globalStyles } from '../global';

export default function SavedJobsScreen() {
  const { savedJobs } = useJobs();

  if (savedJobs.length === 0) {
    return (
      <View style={globalStyles.center}>
        <Text>No saved jobs yet.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.title}>{item.title}</Text>
            <Text>{item.companyName}</Text>
            <Text>
              Salary: ₱ {item.minSalary ?? '-'} - ₱ {item.maxSalary ?? '-'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
