import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleSelectItem = (itemValue, index) => {
    const {onValueChange} = this.props;
    this.toggleDropdown();
    onValueChange(itemValue, index);
  };

  render() {
    const {items, selectedValue} = this.props;
    const {isOpen} = this.state;

    return (
      <View>
        <TouchableOpacity onPress={this.toggleDropdown}>
          <Text>{selectedValue}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={{borderWidth: 1, borderColor: 'gray'}}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.handleSelectItem(item.value, index)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default CustomDropdown;
