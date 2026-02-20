import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationForm'>;

export default function ApplicationFormScreen({ route }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Application Form Screen</Text>
      <Text>Opened from Saved: {route.params?.fromSaved ? 'Yes' : 'No'}</Text>
    </View>
  );
}
