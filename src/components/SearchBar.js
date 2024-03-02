import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const searchIconSize = 20;

const SearchBar = ({ searchValue, setSearchValue, placeholderText = 'Search here' }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 20,
      }}>
      <TextInput
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          minHeight: 30,
          borderColor: 'lightgray',
          borderWidth: 1,
          borderRadius: 6,
          paddingLeft: 10,
        }}
        value={searchValue}
        autoCapitalize='none'
        onChangeText={(t) => setSearchValue(t)}
        placeholder={placeholderText}
      />
      {/* <TouchableOpacity onPress={() => handleSearch(searchValue)}>
        <SvgWithCssUri
          uri={`https://youreats.s3.amazonaws.com/icons/search.svg`}
          width={searchIconSize}
          height={searchIconSize}
          fill={'darkgray'}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchBar;
