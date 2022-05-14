import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchbarComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
console.log(searchQuery);
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery} 
    />
  );
};

export default SearchbarComponent;