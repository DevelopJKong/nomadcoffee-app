import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>그래도 괜찮은거 같은데?</Text>
      <Text>test</Text>
    </View>
  );
};

export default Test;
