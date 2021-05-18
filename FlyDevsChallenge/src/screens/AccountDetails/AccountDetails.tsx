import React, {useState} from 'react';
import {Linking, StyleSheet, Text, TextInput, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../shared/styles/colors';

const AccountDetails = () => {
  const [challengeText, setChallengeText] = useState('');
  const [yourselfText, setYourselfText] = useState('');
  const accountData = {
    name: 'Nacho',
    experience: 0,
    email: 'ignacionachoviejo@gmail.com',
    skills: ['React Native', 'React.js', 'Node.js', 'Java'],
    github: 'https://github.com/nachoviejo',
  };

  const renderSkills = ({item}: {item: string}) => (
    <View key={item} style={styles.row}>
      <MaterialCommunityIcon
        name="check-circle"
        size={15}
        color={colors.black}
      />
      <Text style={styles.data}> {item}</Text>
    </View>
  );

  const changeChallengeText = (value: string) => {
    setChallengeText(value);
  };
  const changeYourselfText = (value: string) => {
    setYourselfText(value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.bold}>Developer: </Text>
        <Text style={styles.data}>{accountData.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Years of experience in RN: </Text>
        <Text style={styles.data}>{accountData.experience}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Email: </Text>
        <Text style={styles.data}>{accountData.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Skills: </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          renderItem={renderSkills}
          data={accountData.skills}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.bold}>Github: </Text>
        <Text
          onPress={() => Linking.openURL(accountData.github)}
          style={styles.data}>
          {accountData.github}
        </Text>
      </View>
      <View style={styles.textCard}>
        <View style={styles.textRow}>
          <Text style={styles.bold}>What whas your biggest challenge? </Text>
          <MaterialCommunityIcon
            name="flower-poppy"
            size={15}
            color={colors.black}
          />
        </View>
        <View style={{marginHorizontal: '5%'}}>
          <TextInput
            multiline
            numberOfLines={4}
            value={yourselfText}
            placeholder="write here..."
            style={styles.textInput}
            onChangeText={changeYourselfText}
            selectionColor={colors.grey}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View style={styles.textCard}>
        <View style={styles.textRow}>
          <Text style={styles.bold}>Tell us something about yourself </Text>
        </View>
        <View style={{marginHorizontal: '5%'}}>
          <TextInput
            multiline
            numberOfLines={4}
            value={challengeText}
            placeholder="write here..."
            style={styles.textInput}
            onChangeText={changeChallengeText}
            selectionColor={colors.grey}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '2%',
  },
  textRow: {
    flexDirection: 'row',
    marginTop: '2%',
    marginHorizontal: '2%',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '4%',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
  },
  data: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
    color: colors.grey,
  },
  textCard: {
    borderColor: colors.black,
    color: colors.black,
    marginTop: '2%',
    borderRadius: 5,
    borderWidth: 0.4,
    backgroundColor: colors.background,
  },
  textInput: {
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
