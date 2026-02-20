import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import uuid from 'react-native-uuid';
import { TextInput } from 'react-native';
import { Job } from '../types/job';
import { globalStyles } from '../global';
import { Button } from 'react-native';
import { useJobs } from '../context/JobsContext';
import { useNavigation } from '@react-navigation/native';


export default function JobFinderScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { savedJobs, saveJob } = useJobs();
  const navigation = useNavigation();


  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const fetchJobs = async () => {
    try {
      const response = await fetch(
        'https://empllo.com/api/v1?limit=20&offset=0'
      );

      const data = await response.json();

      if (!data.jobs || !Array.isArray(data.jobs)) {
        console.log('Unexpected API response', data);
        return;
      }

      const jobsWithId: Job[] = data.jobs.map((job: any) => ({
        id: uuid.v4().toString(),
        title: job.title,
        companyName: job.companyName,
        applicationLink: job.applicationLink,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        jobType: job.jobType,
      }));

      setJobs(jobsWithId);
    } catch (error) {
      console.log('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);




  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Search jobs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={globalStyles.searchInput}
      />

      <Button
      title="View Saved Jobs"
      onPress={() => navigation.navigate('Saved Jobs')}
      />


      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSaved = savedJobs.some((job) => job.id === item.id);

          return (
            <View style={globalStyles.card}>
              <Text style={globalStyles.title}>{item.title}</Text>
              <Text>{item.companyName}</Text>
              <Text>
                Salary: ₱ {item.minSalary ?? '-'} - ₱ {item.maxSalary ?? '-'}
              </Text>

              <Button
                title={isSaved ? 'Saved' : 'Save Job'}
                onPress={() => saveJob(item)}
                disabled={isSaved}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
